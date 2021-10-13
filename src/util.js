import React from "react";
import { Circle,Popup } from "react-leaflet";
import numeral from "numeral";

const casesTypeColors ={
    cases:{
        hex:'#cc1034',
        rgb:'rgb(204,16,52)',
        half_op:'rgba(204,16,52,0.5)',
        multiplier: 800,
    },
    recovered:{
        hex:'#7dd71d',
        rgb:'rgb(125,215,29)',
        half_op:'rgba(125,215,29,0.5)',
        multiplier: 1200,
    },
    deaths:{
        hex:'#fb4443',
        rgb:'rgb(251,68,67)',
        half_op:'rgba(251,68,67,0.5)',
        multiplier: 2000,
    },
}

//for sorting the table data
export const sortData = (data) =>{
    const sortedData = [...data];
    sortedData.sort((a,b)=>{
        if(a.cases> b.cases){
            return -1;
        }
        else{
            return 1;
        }
    });
    return sortedData;
};

//draw circles on the map with interactive tooltip
export const showDataOnMap = (data, casesType='cases')=>{
    data.map(country=>(
        <Circle>
            center = {[country.countryInfo.lat,country.countryInfo.long]}
            fillOpacity = {0.4}
            color={casesTypeColors[casesType].hex}
            fillColor={casesTypeColors[casesType].hex}
            radius={
                Math.sqrt(country[casesType]*casesTypeColors[casesType].multiplier)
            }
            <Popup>
                <div>
                    <div
                    style={{
                        backgroundImage: `url(${country.countryInfo.flag})`
                    }}
                    ></div>
                    <div>{country.country}</div>
                    <div>Cases:{numeral(country.cases).format("0.0")}</div>
                    <div>Recovered:{numeral(country.recovered).format("0.0")}</div>
                    <div>Deaths:{numeral(country.deaths).format("0.0")}</div>
                </div>
            </Popup>
        </Circle>
        
    ));
};