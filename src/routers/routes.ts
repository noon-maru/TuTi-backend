// API BASE: API 경로의 기본 경로
// AUTHENTICATION: 인증 관련 경로
// ADMIN: 관리자 관련 경로
// USER: 사용자 관련 경로
// PLACE: 장소 관련 경로
// COURSE: 코스 관련 경로
// HOME SCREEN: 홈 화면 관련 경로

// API BASE
const API: string = "/api";

// AUTHENTICATION
const AUTH: string = "/auth";
const LOGIN: string = "/login";
const LOGOUT: string = "/logout";

// ADMIN
const ADMIN: string = "/admin";
const RECOMMENDED: string = "/recommended";

// USER
const USERS: string = "/users";
const USERID: string = "/:userId";
const EDITPROFILE: string = "/editprofile";
const WISHPLACE: string = "/wishplace";

// PLACE
const PLACE: string = "/place";
const RECOMMENDEDPLACE: string = "/recommendedplaces";
const NAME: string = "/name";
const REGION: string = "/region";
const TAG: string = "/tag";
const PLACEID: string = "/:placeId";

// COURSE
const COURSE: string = "/course";
const COURSEID: string = "/:courseId";
const USERIMAGE: string = "/userimage";
const IMAGEID: string = "/:imageId";

// HOME SCREEN
const CAROUSEL: string = "/carousel";

interface Routes {
  api: string;

  auth: string;
  login: string;
  logout: string;

  admin: string;
  recommended: string;

  users: string;
  userId: string;
  editprofile: string;
  wishplace: string;

  place: string;
  recommendedplaces: string;
  name: string;
  region: string;
  tag: string;
  placeId: string;

  course: string;
  courseId: string;
  userimage: string;
  imageId: string;

  carousel: string;
}

const routes: Routes = {
  api: API,

  auth: AUTH,
  login: LOGIN,
  logout: LOGOUT,

  admin: ADMIN,
  recommended: RECOMMENDED,

  users: USERS,
  userId: USERID,
  editprofile: EDITPROFILE,
  wishplace: WISHPLACE,

  place: PLACE,
  recommendedplaces: RECOMMENDEDPLACE,
  name: NAME,
  region: REGION,
  tag: TAG,
  placeId: PLACEID,

  course: COURSE,
  courseId: COURSEID,
  userimage: USERIMAGE,
  imageId: IMAGEID,

  carousel: CAROUSEL,
};

export default routes;
