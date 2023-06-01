import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type InititialProps = {
    isLogin: boolean,
    showAlert: {
        message: string,
        color: "red" | "green"
    },
    isLoading: "loading" | "success" | "stable"
}

const initialState: InititialProps = {
    isLogin: false,
    showAlert: {
        message: "",
        color: "red"
    },
    isLoading: "stable"
}

const contentSlice = createSlice({
    name: 'isLogin',
    initialState,
    reducers: {
        changeLogin: (state, action: PayloadAction<boolean>) => {
            state.isLogin = action.payload
        },
        changeAlert: (state, action: PayloadAction<{message:string,color: "red" | "green"}>) => {
            state.showAlert = action.payload;
          },
        changeLoading: (state, action: PayloadAction<"loading" | "success" | "stable">) => {
            state.isLoading = action.payload
        }
    }
})


export default contentSlice.reducer
export const { changeLogin, changeAlert, changeLoading  } = contentSlice.actions