import React from "react";
import { useState, useEffect } from "react"; // permet de manipuler de variables =>

import axios from "axios";

const apiUrl = "https://dumbstockapi.com/stock?exchanges=NYSE";

const TestApi = () => {
    const [isActive, setIsActive] = useState(false);
    const [isClicked, setIsCliked] = useState(false);

    const [getData, setGetData] = useState(null);

    const [loading, setLoading] = useState(true);

    // fonction qui fait le fetch
    //=> le fetch s'execute uniquement au clique sur le bouton
    const callApi = async () => {
        try {
            setLoading(true); // Définissez loading sur true avant de faire l'appel
            const response = await axios.get(apiUrl);
            console.log("response", response);
            setGetData(response.data);
        } catch (error) {
            console.log("error", error);
        } finally {
            setLoading(false); // Mettez à jour l'état loading après la récupération des données ou en cas d'erreur
        }
    };

    const clicked = () => {
        setIsCliked(!isClicked);
        console.log("isClicked", isClicked);
    };

    useEffect(() => {
        // async permet d'executer la tache en arriere plan car ça prend du temps
        // ne bloque pas l'affichge du rest
        const fetchData = async () => {
            //
            try {
                // le await permet de dire attend de recevoir les données de ce site web
                const response = await axios.get(apiUrl);
                //console.log("response", response);
                setGetData(response.data);
                console.log("response.data", response.data);
                setLoading(false); // chargement terminé
            } catch (error) {
                // capture de l'erreur
                console.log("error", error);
                setLoading(false); //chargement terminé
            } finally {
                setLoading(false); //chargement terminé,c s, vld
            }
        };

        // appel : execute fonction asynchrone
        fetchData();

        return () => {
            // Nettoyage au demontage du composant
            // cancelRequest()
        };
    }, []);

    useEffect(() => {
        console.log(
            "le useEffect est déclanché au clique qui dépend du state isClicked"
        );
    }, [isClicked]);
    // [] tableau de dependance en gros si ya rien le useEffect est executer lors du rendu

    return (
        <div>
            {loading ? <p>Chargement ...</p> : <p>J'ai bien reçu les data</p>}
            <ul>
                {/* {getData &&
                    getData.map((item) => {
                        <li key={item.ticker}>{item.name}</li>;
                    })} */}

                {getData &&
                    getData.map((item) => (
                        <li key={item.ticker}>{item.name}</li>
                    ))}
            </ul>
            <button onClick={() => callApi()}>Call API Button</button>
            <button onClick={() => clicked()}>Execute UseEffect</button>
        </div>
    );
};

export default TestApi;
