import { counterReducer } from "../counter/state/counter.reducer";
import { counterState } from "../counter/state/counter.state";
import { postsReducer } from "../posts/state/posts.reducer";
import { PostsState } from "../posts/state/posts.state";

export interface AppState {
    counter: counterState,
    posts: PostsState
}

export const appReducer = {
    counter: counterReducer,
    posts: postsReducer
}