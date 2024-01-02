

this.state.axiosJWT.interceptors.request.use(
      async (config)=>{
         let date = new Date()
         let decodedToken = jwtDecode(this.props.authUser.accessToken)
         console.log(decodedToken)
         if(decodedToken.exp < date.getTime()/1000 ){
            const data = this.refreshToken();
            const refreshUser = {
              ...this.props.authUser.currentUser,
              accessToken: data.accessToken,
            }
            //this.props.loginSuccess(refreshUser)
            // tạo một headers mới thay thế cho headers cũ
            config.headers["token"] = "Bearer "+ data.accessToken
         }
         return config;
        },
            (e)=>{
               return Promise.reject(e)
            }
        );