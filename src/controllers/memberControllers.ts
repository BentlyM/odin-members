import { Request , Response } from "express";

export const home = (request : Request , response: Response) => {
    response.render('index', {user: request.user});
}

export const signup = (request: Request , response: Response) => {
    if(request.method == 'GET') return response.render('sign-up-form');   
}

export const login = (request: Request , response: Response) => {
    if(request.method == 'GET') return response.render('log-in-form');
}