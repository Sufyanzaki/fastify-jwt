import React, { useEffect, useState } from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInputGroup,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit";
import axios from "axios";
import Spinner from "./Spinner/Spinner";

const Weather = () => {

    const [form, setForm] = useState({
        city: 'Multan', country: 'PK'
    })
    const [resp, setResp] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => {
            return ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            })
        })
    }

    const handleSubmit = () => {
        setLoading(true);
        axios.get(`https://api.weatherbit.io/v2.0/current?city=${form.city}&country=PK&key=49c00ab7edd1404589f58a5d033c7381`)
            .then(res => { setResp(res.data.data[0]); setLoading(false) }).catch(err => console.log(err))
    }

    return (
        <section className="vh-100">
            <MDBContainer className="h-100 py-5">
                <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol md="8" lg="6" xl="4">
                        <MDBTypography tag="h3" className="mb-4 pb-2 fw-normal">
                            Weather Application
                        </MDBTypography>

                        <MDBInputGroup className="mb-3">
                            <input onChange={handleChange}
                                className="form-control rounded"
                                type="text"
                                placeholder="City"
                                value={form.city}
                                name="city"
                            />
                            <input onChange={handleChange}
                                className="form-control rounded"
                                type="text"
                                placeholder="Country Code"
                                value={form.country}
                                name="country"
                            />
                            <button type="button" onClick={handleSubmit} style={{ background: "transparent", border: "none" }}>
                                <span
                                    className="input-group-text border-0 fw-bold"
                                    id="search-addon"
                                >
                                    Check!
                                </span>
                            </button>
                        </MDBInputGroup>

                        {loading && <Spinner cover={true} center={true} bg={"white"} />}

                        {resp && <MDBCard className="shadow-0 border">
                            <MDBCardBody className="p-4">
                                <MDBTypography tag="h4" className="mb-1 sfw-normal">{resp && resp.city_name},{resp && resp.country_code}</MDBTypography>
                                <p className="mb-2">
                                    Current temperature: <strong>{resp && resp.temp}°C</strong>
                                </p>
                                <p>
                                    Feels like: <strong>{resp && resp.app_temp}°C</strong>
                                </p>
                                <p>
                                    Sunrise: <strong>{resp && resp.sunrise}AM</strong>, Sunset: <strong>{resp && resp.sunset}PM</strong>
                                </p>
                                <p>
                                    Time Zone: <strong>{resp && resp.timezone}</strong>
                                </p>
                                <p>
                                    Date/Time: <strong>{resp && resp.datetime}</strong>
                                </p>
                                <p>
                                    Snow: <strong>{resp && resp.snow === null ? "No":"Yes"}</strong>
                                </p>
                                <p>
                                    Latitude: <strong>{resp && resp.lat}</strong>, Longitude: <strong>{resp && resp.lon}</strong>
                                </p>
                                <div className="d-flex flex-row align-items-center">
                                    <p className="mb-0 me-4">Description : {resp && resp.weather.description}</p>
                                    <MDBIcon fas icon="cloud" size="3x" style={{ color: '#eee' }} />
                                </div>
                            </MDBCardBody>
                        </MDBCard>}
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
    )
}

export default Weather;