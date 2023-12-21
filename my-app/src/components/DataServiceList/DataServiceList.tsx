import {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import DataServiceCard from "../DataServiceCard/DataServiceCard.tsx";
import {DataService} from "../../models/models.ts";
import { Container, Spinner } from "react-bootstrap"
import filterDataList from "../../modules/filterDataServices.ts";
import { dataServicesMock } from "../../Consts.tsx";

import './DataServiceList.css'

interface DataServiceListProps {
    searchValue: string;
}

const DataServiceList = ({searchValue}: DataServiceListProps) => {
    const [dataServices, setDataServices] = useState<DataService[]>(dataServicesMock);  

    const [loading, setLoading] = useState(true);
    // const [searchValue, setSearchValue] = useState('')

    const navigate = useNavigate()

    const fetchDSList = async () => {
        const dsList: DataService[] = await filterDataList(searchValue);
        setDataServices(dsList)
        setLoading(false)
    };

    useEffect(() => {
        fetchDSList();
    }, [searchValue])

    return (
        <Container className="cards">
            {loading && <div className="loadingBg"><Spinner animation="border"/></div>}
 
            {!loading && dataServices.filter((ds) => (ds.active)).map((ds) => (
                <DataServiceCard 
                    ds={ds}
                    onClick={(id) => (navigate(`service/${id}`, {state: {ds: ds}}))}
                />
            ))}
        </Container>
    );
};

export default DataServiceList;
