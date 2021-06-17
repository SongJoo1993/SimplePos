// import { Fragment } from 'react';
import Header from '../../components/Header/index';
import LogBox from '../../components/MainComponents/LogBox/index';
import CalculatorBox from '../../components/MainComponents/CalculatorBox/index';
import ItemBox from '../../components/MainComponents/ItemBox/index';
import './Main.scss';

function Main (props) {
    // console.log(props.inventoryData);
    return(
        <section className="main">
            <Header />
            <div className="main__body">
                <div className="main__sub-box">
                    <LogBox />
                    <CalculatorBox />
                </div>
                <ItemBox inventoryData = {props.inventoryData}/>
            </div>
        </section>
    )
}

export default Main