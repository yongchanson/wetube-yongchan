import multer from "multer";

export const localsMiddleware = (req, res, next) => {
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.siteName = "Wetube";
    res.locals.loggedInUser = req.session.user || {};
    next();
  };

  export const protectorMiddleware = (req, res, next) => {
    if (req.session.loggedIn) { //loggedIn = 로그인시 session에 저장된정보
      return next();
    } else {
      req.flash("error", "Not authorized");
      return res.redirect("/login");
    }
  };
  
  export const publicOnlyMiddleware = (req, res, next) => {//로그인한 경우
    if (!req.session.loggedIn) {
      return next();
    } else {
      req.flash("error", "Not authorized");
      return res.redirect("/");
    }
  };

  export const avatarUpload = multer({  //multer이 req res역할
    dest: "uploads/avatars/",
    limits: {
      fileSize: 3000000,
    },
  });
  export const videoUpload = multer({
    dest: "uploads/videos/",
    limits: {
      fileSize: 10000000,
    },
  });