function sanitizeTextData(text) {
  let cleaningContainer = text.split("\n");
  let partialCleanedData = [];

  for (let i = 0; i < cleaningContainer.length; i++) {
    if (cleaningContainer[i] === "") {
      continue;
    }
    const semiDirtyData = requiredLine(cleaningContainer[i]);
    if (semiDirtyData.state) {
      partialCleanedData.push(semiDirtyData.requires);
    }
  }

  const cleanDataToSend = superCleaner(partialCleanedData);
  return cleanDataToSend;
}

module.exports = sanitizeTextData;

// HELPER

const isWeirdRepeatingWord = (word) => {
  let counter = 0;
  for (let i = 0; i < word.length - 1; i++) {
    if (word.charAt(i) === word.charAt(i + 1)) {
      counter++;
    }
    if (word.charAt(i) === "e" && word.charAt(i + 1) === "e") {
      return true;
    }
  }
  return counter >= 2;
};

const clearJunkWords = (ln) => {
  const maxWordLengthThreshold = 15;
  const cleanedLn = [];

  for (let i = 0; i < ln.length; i++) {
    if (ln[i].length > maxWordLengthThreshold) {
      continue;
    }
    if (isWeirdRepeatingWord(ln[i])) {
      continue;
    }
    cleanedLn.push(ln[i]);
  }
  return cleanedLn;
};

const requiredLine = (ln) => {
  let lnContainer = ln.split(" ");
  lnContainer = clearJunkWords(lnContainer);
  const minorCleanedLn = lnContainer.join(" ");

  if (lnContainer.length === 0) {
    return { state: false, requires: [] };
  }

  if (!!Number(lnContainer[0])) {
    return { state: true, requires: minorCleanedLn };
  }

  if (lnContainer[0].charAt(0) === "e") {
    return { state: true, requires: minorCleanedLn };
  }

  const matchIt = ln.match(/(Yes|No|Unkn|NA)/g);
  if (!!matchIt) {
    return { state: true, requires: minorCleanedLn };
  }

  return { state: false, requires: minorCleanedLn };
};

const getIndexOf = (ln, word) => {
  return ln.indexOf(word);
};

const superCleaner = (data) => {
  let detailObj = {};
  let currentKeyNumber = 0;

  for (let i = 0; i < data.length; i++) {
    let ln = data[i].split(" ");

    for (let j = 0; j < ln.length; j++) {
      if (!!Number(ln[0])) {
        currentKeyNumber = Number(ln[j]);
        detailObj[currentKeyNumber] = {
          question: currentKeyNumber,
          options: null,
          answer: null,
          subQuestions: [],
        };
      }

      const indOfOptions = getIndexOf(data[i], "[");

      if (ln[j].charAt(0) === "e") {
        const subObj = {
          question: null,
          options: null,
          answer: null,
          subQuestions: [],
        };
        if (indOfOptions === -1) {
          subObj.question = ln.slice(1, ln.length).join(" ");
        } else {
          subObj.question = ln.slice(1, indOfOptions).join(" ");
          subObj.options = data[i].substring(indOfOptions);
        }
        detailObj[currentKeyNumber].subQuestions.push(subObj);
        break;
      }

      if (indOfOptions !== -1) {
        detailObj[currentKeyNumber].options = data[i].substring(indOfOptions);
      }

      break;
    }
  }

  const cleanedData = tryToExtractAnswer(Object.values(detailObj));
  console.log(cleanedData);

  return cleanedData;
};


const optionBox = new Set(["Yes", "No", "Unkn", "NA"]);
const tryToFetchAnswerFromOptions = (quesObj) => {
  const newData = { ...quesObj };
  if(quesObj.options === null) {
    return newData;
  }
  const cleanOptions = quesObj.options.replace(/[\[\]_]/g, " ");
  const matchOptions = /(Y|e|s|N|o|U|n|k|A)/;

  let checked = "";
  let answer = "";

  for (let i = 0; i < cleanOptions.length; i++) {

    if(cleanOptions.charAt(i) === " "){
      answer = "";
      continue;
    }

    if(cleanOptions.charAt(i).match(matchOptions)) {
      answer += cleanOptions.charAt(i);
      // console.log("ANS =>",answer);
    }else {
      checked += cleanOptions.charAt(i);
    }

    if(optionBox.has(answer)) {
      if(checked.length === 0) {
        answer = "";
        continue;
      }
      newData.answer = answer;
      checked = "";
      answer = "";
      break;
    }

  }
  return newData;
};

const tryToExtractAnswer = (data) => {
  const clean = []
  for(let i = 0; i < data.length; i++) {
    const clear = tryToFetchAnswerFromOptions(data[i]);
    if(clear.subQuestions.length > 0) {
      clear.subQuestions = tryToExtractAnswer(clear.subQuestions);
    }
    clean.push(clear);
  };
  return clean;
};