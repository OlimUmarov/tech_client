import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type InititialProps = {
    isLogin: boolean,
    showAlert: {
        message: string,
        color: "red" | "green"
    },
    contentText: string
}

const initialState: InititialProps = {
    isLogin: false,
    showAlert: {
        message: "",
        color: "red"
    },
    contentText: ""
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
        changeContentText: (state, action: PayloadAction<string>) => {
            state.contentText = action.payload
        }
    }
})


export default contentSlice.reducer
export const { changeLogin, changeAlert, changeContentText  } = contentSlice.actions