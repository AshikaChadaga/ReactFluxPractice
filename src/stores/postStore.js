import { EventEmitter } from "events";
import dispatcher from "../appDispatcher";
import actionTypes from "../actions/actionTypes";

const CHANGE_EVENT = "change";
let _posts = [];

class PostStore extends EventEmitter {
    //It adds a change listener that accepts the callback function.
    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }

    //Whenever we don't want to listen for a specific event we use the following method.
    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }

    //Whenever any change occurs, it emits that change.
    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    getPosts() {
        return _posts;
    }
}

const store = new PostStore();

//receive the payload from our Actions component.
dispatcher.register((action) => {
    switch (action.actionTypes) {
        case actionTypes.GET_POSTS:
            _posts = action.posts;
            store.emitChange();
            break;
        default:
    }
});

export default store;