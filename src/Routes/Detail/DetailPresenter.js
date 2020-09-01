
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "../../Components/Loader";
import Helmet from "react-helmet";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";





  

const Container = styled.div`
height: calc(100vh - 50px);
width: 100%;
position: relative;
padding: 50px;




`;

const Backdrop = styled.div`
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-image: url(${props => props.bgImage});
background-position: center center;
background-size:  cover;
filter: blur(3px);
opacity: 0.5;
z-index: 0;
`;

const Content = styled.div`
display: flex;
width: 100%;
position: relative;
z-index: 1;
height: 100%;

@media only screen and (max-width:600px){
  flex-direction: column;
  justify-content: center;
  .Cover{
    width: 80%;
  }
  .Data{
    width: 80%;
  }
}
`;

const Cover = styled.div`
width: 40%;
background-image: url(${props => props.bgImage});
background-position: center center;
background-size: cover;
height: 100%;
border-radius: 5px;

@media only screen and (max-width:600px){
  display: none;
  
}

`;

const Data = styled.div`
width: 60%;
margin-left: 20px;

@media only screen and (max-width:600px){
  margin-top: 50px;
    width: 100%;
    margin-left: 0px;
}

`;

const Title = styled.h3`
font-size: 32px;
`;
const VideoTitle = styled.h5`
font-size: 20px;
`;

const ItemContainer = styled.div`
margin: 20px 0;
`;

const Item = styled.span``;

const Divider = styled.span`
margin: 0 10px;
`;

const Overview= styled.p`
font-size: 12px;
opacity: 0.7;
line-height: 1.5;
width: 50%;
margin-bottom: 20px;

@media only screen and (max-width:600px){
  width: 100%;
}
`;

const Rating = styled.span`
bottom: 5px;
right: 5px;
position: absolute;
opacity:0;
transition: opacity 0.1s linear;
`;

const Video = styled.div`
margin-top: 20px;
width: 100%;
height: 100%;
`;

const Imdb = styled.button`
background-color: rgb(245, 197, 24);
    color: rgb(0, 0, 0);
    font-size: 15px;
    font-weight: 700;
    margin-top: 11px;
    margin-left: 10px;
    padding:0 10px;
    border-radius: 25px;
    border: none;
    &:hover{
      opacity: 0.7;
      cursor: pointer;
    }
`;
const TitleContainer = styled.div`
display: flex;
`;

const VideoError = styled.h3`
font-size: 30px;
`
const CompanyContainer = styled.div`
display: flex;
`;
const Uibox = styled.div`
text-align: center;
margin-right: 20px;
max-width: 500px;
`;


const SmallImg = styled.div`


`;

const SmallContent = styled.h6`
font-size: 20px;
font-weight: 500;
margin-bottom: 20px;
text-justify: center;
`;

const cImg = styled.img `
width: 100px;
height: 100px;
`;

const ScrollContainer = styled.div `

max-width: 800px;
min-height: 500px;
overflow: scroll;

`;

const SeasonsContainer = styled.div `
display: flex;
`;

const SeasonPoster = styled.div`
margin-right: 20px;
`;







const DetailPresenter = ({ result, loading, error }) => loading ?
(<>
<Helmet><title>Loading | Wonflix</title></Helmet>
<Loader />
</>
) : (
  <Container>
    <Helmet>
      <title>
        {result.original_title ? result.original_title : result.original_name}{" "} | Wonflix
      </title>
    </Helmet>


    <Backdrop bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`} />
    <Content>
      <Cover bgImage={result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("../../assets/noPosterSmall.png")}/>

    <Data>
      <TitleContainer>
      <Title>
        {result.original_title ? result.original_title : result.original_name}
      </Title>

      <a href={result.imdb_id ? `//www.imdb.com/title/${result.imdb_id}/` : `${result.homepage}`} target="blank">
      <Imdb>{result.imdb_id ? "IMDB" : "HomePage"}</Imdb>
      </a>
      </TitleContainer>

      <ItemContainer>
        <Item>{result.release_date ? result.release_date.substring(0, 4) :
        result.first_air_date.substring(0, 4)}</Item>
        <Divider>•</Divider>
        <Item>
        {result.runtime !==null ? result.runtime : result.episode_run_time[0]} min
        </Item>
            <Divider>•</Divider>
        <Item>
          {result.genres && result.genres.map((genre, index) => index === result.genres.length -1 ? genre.name : 
          `${genre.name} /`)}
        </Item>
        <Divider>•</Divider>
            <Item>
              <span role="img" aria-label="rating">
                ⭐️
              </span>{" "}
              {result.vote_average}/10
            </Item>
        
      </ItemContainer>
      <Overview> {result.overview} </Overview>

      <ScrollContainer>
    <Tabs>
    <TabList>
      <Tab>Video</Tab>
      <Tab>Companies</Tab>
      <Tab>Countries</Tab>
      {result.seasons ? <Tab>Seasons</Tab> : null}
    </TabList>
    {console.log(result)}
    <TabPanel>
    <VideoTitle>Trailer</VideoTitle>
    
          <Video>
            <Carousel autoPlay>
            {(result.videos.results).length > 0 ?
          result.videos.results.map((Video, index) => 
          (
            
          <div>
          <iframe 
          key={index}
          width="80%" 
          height="350" 
          src={`https://www.youtube.com/embed/${Video.key}`}
          allowFullScreen 
          frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"/>
          </div>
        
          ))
          : <VideoError>No Trailer sorry :( </VideoError>} 
          </Carousel>
          </Video>
    </TabPanel>


    <TabPanel>
    
    <CompanyContainer>
    
          {result.production_companies.map(company =>
          
          <Uibox>
            <SmallContent>{company.name}</SmallContent>
            <SmallImg>
            <img className="cImg" src={company.logo_path ? `https://image.tmdb.org/t/p/w200${company.logo_path}`  :  require("../../assets/noImage.jpg")}></img>
            </SmallImg>           
           
           </Uibox>
          )}
         
          </CompanyContainer>
          
    </TabPanel>


    <TabPanel>
      {result.production_countries ? result.production_countries.map(country => 
      <SmallContent>{country.name}</SmallContent>)
    : "NO DATA :("}
          </TabPanel>

    <TabPanel>
      <SeasonsContainer>
      {result.seasons ? result.seasons.map((item, index) => 
      <SeasonPoster>
      <img key={index} 
      src={item.poster_path ? 
      `https://image.tmdb.org/t/p/w200${item.poster_path}` 
      : require("../../assets/noImage.jpg")} />
      <h6>{item.air_date}</h6>
      <h6>{item.name}</h6>
      </SeasonPoster>
      
      
      ): null}
      </SeasonsContainer>
    </TabPanel>
  
  
  
  </Tabs>
  </ScrollContainer>

          
    </Data>
    </Content>
  </Container>
);

DetailPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string
};

export default DetailPresenter;