import decode from 'jwt-decode';

class AuthService {
  getProfile() {
    try {
      return decode(this.getToken());
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  loggedIn() {
    const token = this.getToken();
    // If there is a token and it's not expired, return `true`
    return token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    try {
      // Decode the token to get its expiration time
      const decoded = decode(token);
      // If the expiration time is less than the current time (in seconds), the token is expired
      if (decoded.exp < Date.now() / 1000) {
        this.logout(); // Clean up expired token
        return true;
      }
    } catch (error) {
      console.error('Error decoding token:', error);
    }
    return false;
  }

  login(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/'); // Consider using a React Router redirect instead
  }

  logout() {
    localStorage.removeItem('id_token');
    window.location.reload(); // Alternatively, use history.push('/') to navigate
  }
}

export default new AuthService();
