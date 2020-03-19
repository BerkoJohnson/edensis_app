const express = require("express");
const router = express.Router();
const electionsCtrl = require("../controllers/elections");

const multer = require("multer");

const upload = multer({
  limits: {
    fileSize: 1000000,
    files: 1
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Upload image file only"));
    }

    cb(undefined, true);
  }
});



const auth = require('../utils/auth');

router.use(auth);

/** Main Election Routes */
router
  .route("/")
  .post(electionsCtrl.createElection)
  .get(electionsCtrl.fetchElections);

router
  .route("/:election")
  .get(electionsCtrl.fetchElection)
  .put(electionsCtrl.updateElection)
  .delete(electionsCtrl.deleteElection);

/** Positions Routes */
router
  .route("/:election/positions")
  .post(electionsCtrl.createPosition)
  .get(electionsCtrl.fetchPositions);

router
  .route("/:election/positions/:position")
  .get(electionsCtrl.fetchPosition)
  .put(electionsCtrl.updatePosition)
  .delete(electionsCtrl.deletePosition);


/** Candidates Routes */

router
  .route("/:election/positions/:position/candidates")
  .post(upload.single("photo"), electionsCtrl.createCandidate)
  .get(electionsCtrl.fetchCandidates);

router
  .route("/:election/positions/:position/candidates/:candidate")
  .get(electionsCtrl.fetchCandidate)
  .put(upload.single("photo"), electionsCtrl.updateCandidate)
  .delete(electionsCtrl.deleteCandidate);

  /** Voting Candidates */
  router
  .route("/:election/positions/:position/candidates/:candidate/voting")
  .put( electionsCtrl.votesCandidate);
  
module.exports = router;
