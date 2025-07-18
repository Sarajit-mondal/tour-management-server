/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import passport from "passport";

import { Strategy as GoogleStrategy, Profile, VerifyCallback } from "passport-google-oauth20";
import { envVabs } from "./env";
import { User } from "../modules/user/user.modle";
import { Role } from "../modules/user/user.interface";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs"

passport.use(
     // google local login 
    new LocalStrategy({
        usernameField:"email",
        passwordField: "password"
    },async(email:string,password:string,done)=>{
        try {
        const isUserExist =await User.findOne({email})

        if(!isUserExist){
            return done("User does not exist")
        }

        const isGoogleAuthenticated = isUserExist.auths.some(providerObject => providerObject.provider === "google")

        if(isGoogleAuthenticated && !isUserExist.password){
            return done(null,false,{message : "You have authenticated through Google. So if you want to login with credentials, then at first login with google and set a password for your Gmail and then you can login with email and password."})
        }

        const isPasswordMatched = await bcrypt.compare(password,isUserExist.password as string)

        if(!isPasswordMatched){
            return done(null,false,{message:"Password does not match"})
        }

        return done(null,isUserExist)


        } catch (error) {
        console.log(error)
        done(error)
        }
    })
)

// google login 
passport.use(
    new GoogleStrategy(
        {
         clientID : envVabs.GOOGLE_CLIENT_ID,
         clientSecret : envVabs.GOOGLE_CLIENT_SECRET,
         callbackURL : envVabs.GOOGLE_CALLBACK_URL
        },async(accessToken:string,refreshToken:string,profile:Profile,done:VerifyCallback)=>{
            try {
              
                const email = profile.emails?.[0].value
                if(!email){
                    return done(null,false,{message: "No email found"})
                }

                let user = await User.findOne({email})
                  console.log(user)

                if(!user){
                  user = await User.create({
                    email,
                    name : profile.displayName,
                    picture: profile.photos?.[0].value,
                    role:Role.USER,
                    isVerified : true,
                    auths:[
                        {
                            provider : "google",
                            providerId : profile.id
                        }
                    ]
                  })
                }

                return done(null,user)

            } catch (error) {
            console.log("Google strategy Error",error)
            return done(error)
            }
        }
    )

)

passport.serializeUser((user: any, done: (err: any, id?: unknown) => void) => {
    done(null, user._id)
})

passport.deserializeUser(async (id: string, done: any) => {
    try {
        const user = await User.findById(id);
        done(null, user)
    } catch (error) {
        console.log(error);
        done(error)
    }
})