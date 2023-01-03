import { all, fork, call, take, put } from "redux-saga/effects";
import axios from "axios";

function logInAPI(data) {
  return axios.post("/api/login", data);
}

function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data); // fork 는 비동기 함수 호출 call은 동기 함수 호출, fork 는 결과 기다리지 않고 바로 실행되어버린다. call은 .then과 같은 효과가 나타난다.
    yield put({
      type: "LOG_IN_SUCCESS",
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: "LOG_IN_FAILURE",
      data: err.response.data,
    });
  }
}

function logOutAPI() {
  return axios.post("/api/logout");
}

function* logOut() {
  try {
    const result = yield call(logOutAPI); // fork 는 비동기 함수 호출 call은 동기 함수 호출, fork 는 결과 기다리지 않고 바로 실행되어버린다. call은 .then과 같은 효과가 나타난다.
    yield put({
      type: "LOG_OUT_SUCCESS",
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: "LOG_OUT_FAILURE",
      data: err.response.data,
    });
  }
}

function addPostAPI(data) {
  return axios.post("/api/post");
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data); // fork 는 비동기 함수 호출 call은 동기 함수 호출, fork 는 결과 기다리지 않고 바로 실행되어버린다. call은 .then과 같은 효과가 나타난다.
    yield put({
      type: "ADD_POST_SUCCESS",
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: "ADD_POST_FAILURE",
      data: err.response.data,
    });
  }
}

function* watchLogin() {
  yield take("LOG_IN_REQUEST", logIn);
}

function* watchLogOut() {
  yield take("LOG_OUT_REQUEST", logOut);
}

function* watchAddPost() {
  yield take("ADD_POST_REQUEST", addPost);
}

export default function* rootSaga() {
  yield all([
    fork(watchLogin), // call 추후 비교해야함
    fork(watchLogOut),
    fork(watchAddPost),
  ]);
}
