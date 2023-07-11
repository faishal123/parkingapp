import Airtable from "airtable";
import React from "react";

// const airtableApiKey =
//   "patQii9pgLmEgFCgX.5b98816baa160a7a36a7b14adb2f63e542c7dafe405b12bbe3cc7ac1dd589bb8";
const apikey = "keyRwwLZXvBXBhvqN";
const baseId = "app98Sm6Wgc4kAmOs";

const base = new Airtable({ apiKey: apikey }).base(baseId);

export const getRecords = (basename = "parkingdata") => {
  return base(basename)
    .select({
      view: "Grid view",
    })
    .all();
};

export const createRecords = (basename, data, onError, onCompleted) => {
  return base(basename).create(data, onError, onCompleted);
};

export const deleteRecords = (
  basename,
  id,
  onError = () => null,
  onCompleted = () => null
) => {
  return base(basename).destroy(id, (e, deletedRecord) => {
    if (e) {
      onError(e);
      return;
    }
    onCompleted(deletedRecord);
  });
};

const addZero = (string) => {
  if (`${string}`.length <= 1) {
    return `0${string}`;
  }
  return string;
};

export const formatDate = (dateRaw) => {
  const historyDate = new Date(dateRaw);
  return (
    <>
      {addZero(historyDate.getDate())}/{addZero(historyDate.getMonth())}
      {"/"}
      {historyDate.getFullYear()} {addZero(historyDate.getHours())}:
      {addZero(historyDate.getMinutes())}
    </>
  );
};
