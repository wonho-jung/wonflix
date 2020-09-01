import React from "react";
import HomePresenter from "./HomePresenter";
import { MoivesApi } from "api"


export default class extends React.Component{
    state = {
        nowPlaying:null,
        upComing:null,
        popular:null,
        error: null,
        loading: true
    };

    async componentDidMount(){
        try{
            const {
            data: {results: nowPlaying}
        } = await MoivesApi.nowPlaying();
            const {
            data: {results: upComing}
        } = await MoivesApi.upComing();
            const {
            data: {results: popular}
        } = await MoivesApi.popular();

        this.setState({
            nowPlaying,
            upComing,
            popular
        });
            
        }catch{
            this.setState({
                error: "Can't find movies information."
            })
        } finally{
            this.setState({
                loading: false
            });
        }
        
    }

    render() {
        const { nowPlaying, upComing, popular, error, loading } =this.state;
        return(
            <HomePresenter 
             nowPlaying={nowPlaying}
             upComing={upComing}
             popular={popular}
             error={error}
             loading={loading}
            />
        )
    }
}