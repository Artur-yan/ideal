import { USER_BASE_ROUTE } from '@platform/constants/routes';
import { RoleEnum } from '@enums/role.enum';

export class AppHelper {

  static GET_BASE_ROUTE(role: RoleEnum): string {
    switch (role) {
      default:
        return 'home';
    }
  }

  static GENERATE_ID(length: number): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  static DOWNLOAD_FROM_URL(url: string) {
    const downloadLink = document.createElement('a');
    document.body.appendChild(downloadLink);

    downloadLink.href = url;
    downloadLink.target = '_self';
    downloadLink.click();
  }

  static TO_ISO_FORMAT(date: string | Date): string {
    const offset = (new Date(date)).getTimezoneOffset() * 60000;
    return (new Date(new Date(date).getTime() - offset)).toISOString().slice(0, -1);
  }

  static PARSE_TOKEN(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }
}
