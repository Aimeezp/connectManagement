import { commonIp } from '@/config/baseIp';

const base = `http://${commonIp}/unicom-iot/auth`;

export default {
  login: `${base}/token/platform`, // online   user
  logout: `${base}/token/logout`, // logout
  changePassword: `${base}/password`, // change pwd
  authorList: `${base}/authCheck`, // get user author
  imageCode: `${base}/token/ImageCode`,
};
