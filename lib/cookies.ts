/**
 * Cookie utility functions for Next.js applications
 * Handles cookie operations with proper error handling and browser compatibility
 */

export interface CookieOptions {
  expires?: Date | number;
  maxAge?: number;
  domain?: string;
  path?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

/**
 * Set a cookie with proper error handling
 */
export function setCookie(name: string, value: string, options: CookieOptions = {}): boolean {
  if (typeof window === 'undefined') {
    console.warn('setCookie called on server side');
    return false;
  }

  try {
    // Default options
    const defaultOptions: CookieOptions = {
      path: '/',
      sameSite: 'lax',
      secure: window.location.protocol === 'https:',
    };

    const finalOptions = { ...defaultOptions, ...options };
    
    // Build cookie string
    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    // Add path
    if (finalOptions.path) {
      cookieString += `; path=${finalOptions.path}`;
    }

    // Add domain
    if (finalOptions.domain) {
      cookieString += `; domain=${finalOptions.domain}`;
    }

    // Add expires or max-age
    if (finalOptions.expires) {
      if (typeof finalOptions.expires === 'number') {
        const date = new Date();
        date.setTime(date.getTime() + finalOptions.expires * 1000);
        cookieString += `; expires=${date.toUTCString()}`;
      } else {
        cookieString += `; expires=${finalOptions.expires.toUTCString()}`;
      }
    } else if (finalOptions.maxAge) {
      cookieString += `; max-age=${finalOptions.maxAge}`;
    }

    // Add secure flag
    if (finalOptions.secure) {
      cookieString += '; secure';
    }

    // Add httpOnly flag (note: this won't work in client-side JS, but included for completeness)
    if (finalOptions.httpOnly) {
      cookieString += '; httponly';
    }

    // Add sameSite
    if (finalOptions.sameSite) {
      cookieString += `; samesite=${finalOptions.sameSite}`;
    }

    // Validate cookie size (browsers typically limit to 4KB)
    if (cookieString.length > 4096) {
      console.error('Cookie size exceeds 4KB limit:', cookieString.length);
      return false;
    }

    // Set the cookie
    document.cookie = cookieString;
    
    // Verify the cookie was set
    const wasSet = getCookie(name) === value;
    if (!wasSet) {
      console.warn(`Failed to set cookie: ${name}`);
    }
    
    return wasSet;
  } catch (error) {
    console.error('Error setting cookie:', error);
    return false;
  }
}

/**
 * Get a cookie value
 */
export function getCookie(name: string): string | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const nameEQ = encodeURIComponent(name) + '=';
    const cookies = document.cookie.split(';');
    
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.indexOf(nameEQ) === 0) {
        return decodeURIComponent(cookie.substring(nameEQ.length));
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error getting cookie:', error);
    return null;
  }
}

/**
 * Delete a cookie
 */
export function deleteCookie(name: string, options: Omit<CookieOptions, 'expires' | 'maxAge'> = {}): boolean {
  return setCookie(name, '', {
    ...options,
    expires: new Date(0),
  });
}

/**
 * Check if cookies are enabled in the browser
 */
export function areCookiesEnabled(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    const testCookie = '__cookie_test__';
    // Use a silent version that doesn't log warnings
    const cookieString = `${encodeURIComponent(testCookie)}=${encodeURIComponent('test')}; path=/; max-age=1`;
    document.cookie = cookieString;
    const enabled = getCookie(testCookie) === 'test';
    if (enabled) {
      // Silent cleanup
      document.cookie = `${encodeURIComponent(testCookie)}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }
    return enabled;
  } catch {
    return false;
  }
}

/**
 * Get all cookies as an object
 */
export function getAllCookies(): Record<string, string> {
  if (typeof window === 'undefined') {
    return {};
  }

  try {
    const cookies: Record<string, string> = {};
    const cookieStrings = document.cookie.split(';');
    
    for (let cookie of cookieStrings) {
      cookie = cookie.trim();
      const [name, ...valueParts] = cookie.split('=');
      if (name && valueParts.length > 0) {
        const value = valueParts.join('=');
        cookies[decodeURIComponent(name)] = decodeURIComponent(value);
      }
    }
    
    return cookies;
  } catch (error) {
    console.error('Error getting all cookies:', error);
    return {};
  }
}
