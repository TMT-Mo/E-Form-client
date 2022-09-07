
const apiHead = 'https://e-box-vlu.herokuapp.com/api/'

export const apiPaths = {
    student:{
        questionList: `${apiHead}user/mailbox/list_questions_user`
    },
    auth:{
        login: `${apiHead}user/user/login`
    }
}