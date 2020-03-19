const Election = require("../models/Election");
const ErrorResponse = require("../utils/errorResponse");
const sharp = require('sharp');

exports.fetchElections = async (req, res, next) => {
  try {
    const elections = await Election.find();
    res.status(200).json({
      success: true,
      count: elections.length,
      data: elections
    });
  } catch (error) {
    return next(new ErrorResponse(`Fetching Elections failed`, 400));
  }
};

// Get Election
exports.fetchElection = async (req, res, next) => {
  try {
    const { election } = req.params;
    const electionInDB = await Election.findById(election);
    if (!electionInDB) {
      return next(new ErrorResponse(`Election not found`, 404));
    }
    res.status(200).json({
      success: true,
      data: electionInDB
    });
  } catch (error) {
    return next(new ErrorResponse(error.message, 400));
  }
};

// Create Election
exports.createElection = async (req, res, next) => {
  try {
    const { title, school, academicYear } = req.body;
    const election = new Election({ title, school, academicYear });
    const savedElection = await election.save();

    if (!savedElection) {
      return next(new ErrorResponse(`Election creation failed`, 400));
    }

    res.status(201).json({
      success: true,
      data: savedElection
    });
  } catch (error) {
    return next(new ErrorResponse(error.message, 400));
  }
};

// Update Election
exports.updateElection = async (req, res, next) => {
  try {
    const { title, school, academicYear } = req.body;
    const { election } = req.params;
    const electionInDB = await Election.findByIdAndUpdate(relection,
      { title, school, academicYear }, {
      new: true,
      runValidators: true
    });
    if (!election) {
      return next(new ErrorResponse(`Election not found`, 404));
    }
    res.status(200).json({
      success: true,
      data: electionInDB
    });
  } catch (error) {
    next(error);
  }
};

// Delete Election
exports.deleteElection = async (req, res, next) => {
  try {
    const { election } = req.params;
    const electionInDB = await Election.findByIdAndDelete(election);
    if (!electionInDB) {
      return next(new ErrorResponse(`Election not found`, 404));
    }
    res.status(200).json({
      success: true
    });
  } catch (error) {
    next(new ErrorResponse(`Delete election ${req.params.id} failed`, 400));
  }
};


/**  Positions routes */

// Create Position
exports.createPosition = async (req, res, next) => {
  try {
    const { title, cast_type } = req.body;
    const { election } = req.params;
    const electionInDB = await Election.findById(election);

    // Unique validations fails in subdocuments // Implement filter to check if position exists
    const positions = electionInDB.positions;

    const foundIndex = positions.findIndex((p) => p.title === title);
    // console.log(foundIndex);

    if (foundIndex < 0) {
      positions.push({ title, cast_type }); // Push position to this election
      const savedElection = await electionInDB.save();

      if (!savedElection) {
        return next(new ErrorResponse(`Position saving failed`, 400));
      }
    } else {
      return next(new ErrorResponse(`Position exists`, 400));
    }

    res.status(201).json({
      success: true
    });
  } catch (error) {
    return next(new ErrorResponse(`Election creation failed`, 400));
  }
};


// Get Positions for a single Election
exports.fetchPositions = async (req, res, next) => {
  try {
    const { election } = req.params;
    const electionInDB = await Election.findById(election);
    if (!electionInDB) {
      return next(new ErrorResponse(`Election not found`, 404));
    }
    res.status(200).json({
      success: true,
      data: electionInDB.positions
    });
  } catch (error) {
    return next(new ErrorResponse(error.message, 404));
  }
};

// Fetch Position
exports.fetchPosition = async (req, res, next) => {
  try {
    const { election, position } = req.params;
    const electionInDB = await Election.findById(election);

    if (!electionInDB) {
      return next(new ErrorResponse(`Election not found`, 400));
    }
    // get position to this election
    const positionInDB = electionInDB.positions.id(position);

    if (!positionInDB) {
      return next(new ErrorResponse(`Position not found`, 400));
    }

    res.status(200).json({
      success: true,
      data: positionInDB
    });
  } catch (error) {
    return next(error);
  }
};

// Update Position
exports.updatePosition = async (req, res, next) => {
  try {
    const { title, cast_type } = req.body;
    const { election, position } = req.params;
    const electionInDB = await Election.findById(election);

    if (!electionInDB) {
      return next(new ErrorResponse(`Election not found`, 400));
    }
    // get position to this election
    const positionInDB = electionInDB.positions.id(position);

    if (!positionInDB) {
      return next(new ErrorResponse(`Position not found`, 400));
    }

    // Update the fields
    positionInDB.title = title;
    positionInDB.cast_type = cast_type;

    // save the election with the position updates
    const savedElection = await electionInDB.save();

    if (!savedElection) {
      return next(new ErrorResponse(`Position update failed`, 400));
    }

    res.status(200).json({
      success: true,
      data: savedElection
    });
  } catch (error) {
    return next(error);
  }
};


// Delete Position
exports.deletePosition = async (req, res, next) => {
  try {
    // const { title, cast_type} = req.body;
    const { election, position } = req.params;


    const electionInDB = await Election.findById(election);

    if (!electionInDB) {
      return next(new ErrorResponse(`Election not found`, 400));
    }
    // get position to this election
    const positionInDB = electionInDB.positions.id(position);

    if (!positionInDB) {
      return next(new ErrorResponse(`Position not found`, 400));
    }
    positionInDB.remove();
    // save the election with the position updates
    const savedElection = await electionInDB.save();

    if (!savedElection) {
      return next(new ErrorResponse(`Election saving failed`, 400));
    }

    res.status(201).json({
      success: true,
      data: savedElection
    });
  } catch (error) {
    return next(error);
  }
};



// Get Candidates for a position in an election
exports.fetchCandidates = async (req, res, next) => {
  try {

    const { election, position } = req.params;
    if (!election || !position) {
      return next(new ErrorResponse('Invalid Request', 400));
    }
    const electionInDB = await Election.findById(election);
    if (!electionInDB) {
      return next(new ErrorResponse(`Election not found`, 404));
    }

    // get position subdocuments
    const positionInDB = electionInDB.positions.id(position);
    if (!positionInDB) {
      return next(new ErrorResponse(`Position not found`, 404));
    }

    // Get candidates for this positions
    const candidates = positionInDB.candidates;

    res.status(200).json({
      success: true,
      count: candidates.length,
      data: candidates
    });
  } catch (error) {
    return next(new ErrorResponse(`Fetching candidates failed`, 400));
  }
};

// Get Candidate
exports.fetchCandidate = async (req, res, next) => {
  try {

    const { election, position, candidate } = req.params;
    if (!election || !position || !candidate) {
      return next(new ErrorResponse('Invalid Request', 400));
    }
    const electionInDB = await Election.findById(election);
    if (!electionInDB) {
      return next(new ErrorResponse(`Election not found`, 404));
    }

    // get position subdocuments
    const positionInDB = electionInDB.positions.id(position);
    if (!positionInDB) {
      return next(new ErrorResponse(`Position not found`, 404));
    }

    // Get candidates for this positions
    const candidateInDB = positionInDB.candidates.id(candidate);
    if (!candidateInDB) {
      return next(new ErrorResponse(`Candidate not found`, 404));
    }

    res.status(200).json({
      success: true,
      data: candidateInDB
    });
  } catch (error) {
    return next(error);
  }
};

// Create Candidate
exports.createCandidate = async (req, res, next) => {
  try {
    const { election, position } = req.params;

    if (!election || !position) {
      return next(new ErrorResponse('Invalid Request', 400));
    }
    const { name, studentID, nickname, gender, dob, room } = req.body;

    // console.log(req.file);
    // No image file submitted
    if (!req.file) {
      return next(new ErrorResponse("Please select an image", 400));
    }
    const image = await sharp(req.file.buffer).resize(200, 200).toBuffer();

    const electionInDB = await Election.findById(election);
    if (!electionInDB) {
      return next(new ErrorResponse(`Election not found`, 404));
    }

    // get position subdocuments
    const positionInDB = electionInDB.positions.id(position);
    if (!positionInDB) {
      return next(new ErrorResponse(`Position not found`, 404));
    }

    // Get candidates for this positions
    const candidates = positionInDB.candidates;

    // Add new candidates to candidates array
    candidates.push({
      name,
      studentID,
      nickname,
      gender,
      dob,
      room,
      photo: image
    })

    await electionInDB.save();

    res.status(201).json({
      success: true
    });
  } catch (error) {
    return next(error);
  }
};

// Update Candidate
exports.updateCandidate = async (req, res, next) => {
  try {

    const { election, position, candidate } = req.params;
    if (!election || !position || !candidate) {
      return next(new ErrorResponse('Invalid Request', 400));
    }

    const { name, studentID, nickname, gender, dob, room } = req.body;

    const electionInDB = await Election.findById(election);
    if (!electionInDB) {
      return next(new ErrorResponse(`Election not found`, 404));
    }

    // get position subdocuments
    const positionInDB = electionInDB.positions.id(position);
    if (!positionInDB) {
      return next(new ErrorResponse(`Position not found`, 404));
    }

    // Get candidates for this positions
    let candidateInDB = positionInDB.candidates.id(candidate);
    if (!candidateInDB) {
      return next(new ErrorResponse(`Candidate not found`, 404));
    }
    // Then update if found
    if (name) {candidateInDB.name = name;}
    if (studentID) {candidateInDB.studentID = studentID;}
    if (nickname) {candidateInDB.nickname = nickname;}
    if (gender) {candidateInDB.gender = gender;}
    if (dob) {candidateInDB.dob = dob;}
    if (room) {candidateInDB.room = room;}

    if (req.file) {
      const image = await sharp(req.file.buffer).resize(200, 200).toBuffer();
      candidateInDB.photo = image;
    }

    //Save the position
    await positionInDB.save();
    // Save election
    await electionInDB.save();

    res.status(200).json({
      success: true
    });
  } catch (error) {
    next(error);
  }
};

// Delete Candidate
exports.deleteCandidate = async (req, res, next) => {
  try {

    const { election, position, candidate } = req.params;
    if (!election || !position || !candidate) {
      return next(new ErrorResponse('Invalid Request', 400));
    }
    const electionInDB = await Election.findById(election);
    if (!electionInDB) {
      return next(new ErrorResponse(`Election not found`, 404));
    }

    // get position subdocuments
    const positionInDB = electionInDB.positions.id(position);
    if (!positionInDB) {
      return next(new ErrorResponse(`Position not found`, 404));
    }

    // Get candidates for this positions
    const candidateInDB = positionInDB.candidates.id(candidate);
    if (!candidateInDB) {
      return next(new ErrorResponse(`Candidate not found`, 404));
    }
    // Then remove if found
    candidateInDB.remove();

    // Save election
    await electionInDB.save();

    res.status(200).json({
      success: true
    });
  } catch (error) {
    next(error);
  }
};


// votesCandidate
exports.votesCandidate = async (req, res, next) => {
  try {

    const { election, position, candidate } = req.params;
    if (!election || !position || !candidate) {
      return next(new ErrorResponse('Invalid Request', 400));
    }

    const { votes } = req.body;

    const electionInDB = await Election.findById(election);
    if (!electionInDB) {
      return next(new ErrorResponse(`Election not found`, 404));
    }

    // get position subdocuments
    const positionInDB = electionInDB.positions.id(position);
    if (!positionInDB) {
      return next(new ErrorResponse(`Position not found`, 404));
    }

    // Get candidates for this positions
    let candidateInDB = positionInDB.candidates.id(candidate);
    if (!candidateInDB) {
      return next(new ErrorResponse(`Candidate not found`, 404));
    }
    // Then update if found
    if (positionInDB.cast_type === 'Thumbs' && votes === 'thumbs') {
      candidateInDB.votes.thumbs = candidateInDB.votes.thumbs + 1;
    } else if (positionInDB.cast_type === 'Yes/No' && votes === 'yes') {
      candidateInDB.votes.yes = candidateInDB.votes.yes + 1;
    } else if (positionInDB.cast_type === 'Yes/No' && votes === 'no') {
      candidateInDB.votes.no = candidateInDB.votes.no + 1;
    }

    // Save election
    await electionInDB.save();

    res.status(200).json({
      success: true
    });
  } catch (error) {
    next(error);
  }
};