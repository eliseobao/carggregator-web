import React from 'react';
import ReactDOM from 'react-dom';

import {
    ReactiveBase,
    DataSearch,
    MultiList,
    SelectedFilters,
    ReactiveList,
    RangeInput
} from '@appbaseio/reactivesearch';
import {
    Row,
    Col,
    Card,
} from 'antd';
import 'antd/dist/antd.css';

import {ReactComponent as Logo1} from './corporate/carggregator_logo_1.svg';

import createDOMPurify from 'dompurify';

const DOMPurify = createDOMPurify(window);

function getNestedValue(obj, path) {
    const keys = path.split('.');
    const nestedValue = keys.reduce((value, key) => {
        if (value) {
            return value[key];
        }
        return '';
    }, obj);
    if (typeof nestedValue === 'object') {
        return JSON.stringify(nestedValue);
    }
    return nestedValue;
}

function renderItem(res, triggerClickAnalytics) {
    let {brand, model, price_cash, price_financed, location, registration_date, fuel, odometer, hp, transmission, url, image, publisher} = {
        "brand": "brand", "model": "model", "price_cash": "price_cash", "price_financed": "price_financed",
        "location": "location", "registration_date": "registration_date", "fuel": "fuel", "odometer": "odometer",
        "hp": "hp", "transmission": "transmission", "url": "url", "image": "image", "publisher": "publisher", "showRest": false
    };
    brand = getNestedValue(res, brand)
    model = getNestedValue(res, model)
    price_cash = getNestedValue(res, price_cash)
    price_financed = getNestedValue(res, price_financed)
    location = getNestedValue(res, location)
    registration_date = getNestedValue(res, registration_date)
    fuel = getNestedValue(res, fuel)
    odometer = getNestedValue(res, odometer)
    hp = getNestedValue(res, hp)
    transmission = getNestedValue(res, transmission)
    url = getNestedValue(res, url)
    image = getNestedValue(res, image)
    publisher = getNestedValue(res, publisher)

    let title = brand + ' ' + model
    let description = ''

    if (location !== undefined) {
        description += location + ' | '
    } if (registration_date !== undefined) {
        description += registration_date + ' | '
    } if (odometer !== undefined) {
        description += odometer + ' Kms | '
    } if (fuel !== undefined) {
        description += fuel + ' | '
    } if (hp !== undefined) {
        description += hp + ' CV |'
    } if (transmission !== undefined) {
        description += transmission
    }

    let prices = 'Cash: ' + price_cash + '€'
    if (price_financed  !== undefined){
        prices += ' | Financed: ' + price_financed + '€'
    }

    return (
        <Row onClick={triggerClickAnalytics} type="flex" gutter={16} key={res._id}
             style={{margin: '20px auto', borderBottom: '1px solid #ededed'}}>
            <Col span={10}>
                {image && <img width={300} src={image} alt={brand}/>}
            </Col>
            <Col span={14}>
                <a onClick={() => window.open(url, '_blank')}>
                    <h3 style={{fontWeight: '600'}}
                        dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(title)}}/>
                </a>
                <p style={{fontSize: '1em'}}
                   dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(description)}}/>
                <p style={{fontSize: '1em'}}
                   dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(prices)}}/>
                <p style={{fontSize: '1em'}}
                   dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(publisher)}}/>
            </Col>
        </Row>
    );
}

const App = () => (
    <ReactiveBase
        app="carggregator-index"
        credentials="null"
        url="http://localhost:9200"
        analytics={false}
        searchStateHeader
    >
        <Row gutter="lg" style={{padding: 20}}>
            <Col span={4}>
                <Card>
                    <div style={{marginBottom: 10}}>
                        <Logo1 />
                    </div>
                    <MultiList
                        componentId="Publisher"
                        dataField="publisher.raw"
                        style={{
                            marginBottom: 20
                        }}
                        title="Publisher"
                        react={{
                            and: ['Search', 'Price', 'Brand', 'Odometer', 'Fuel', 'Horse Power', 'Location', 'Transmission']
                        }}
                    />
                    <RangeInput
                        componentId="Price"
                        dataField="price_cash"
                        title="Price" 
                        snap={false}
                        style={{
                            marginBottom: 20
                        }}
                        rangeLabels={{
                            "start": "Start",
                            "end": "End"
                        }}
                        range={{
                             "start": 0,
                             "end": 100000
                        }}
                        react={{
                            and: ['Search', 'Publisher', 'Brand', 'Odometer', 'Fuel', 'Horse Power', 'Location', 'Transmission']
                        }}
                    />

                    <RangeInput
                        componentId="Horse Power"
                        dataField="hp"
                        snap={false}
                        showHistogram={false}
                        style={{
                            marginBottom: 20
                        }}
                        title="Horse Power"
                        rangeLabels={{
                            "start": "Start",
                            "end": "End"
                        }}
                        range={{
                            "start": 0,
                            "end": 800
                        }}
                        react={{
                            and: ['Search', 'Publisher', 'Price', 'Brand', 'Odometer', 'Fuel', 'Location', 'Transmission']
                        }}
                    />
                    <RangeInput
                        componentId="Odometer"
                        dataField="odometer"
                        snap={false}
                        showHistogram={false}
                        style={{
                            marginBottom: 20
                        }}
                        title="Odometer"
                        rangeLabels={{
                            "start": "Start",
                            "end": "End"
                        }}
                        range={{
                            "start": 0,
                            "end": 300000
                        }}
                        react={{
                            and: ['Search', 'Publisher', 'Price', 'Brand', 'Fuel', 'Horse Power', 'Location', 'Transmission']
                        }}
                    />

                    <MultiList
                        componentId="Brand"
                        dataField="brand.raw"
                        style={{
                            marginBottom: 20
                        }}
                        title="Brand"
                        react={{
                            and: ['Search', 'Publisher', 'Price', 'Odometer', 'Fuel', 'Horse Power', 'Location', 'Transmission']
                        }}
                    />

                    <MultiList
                        componentId="Fuel"
                        dataField="fuel.raw"
                        showSearch={false}
                        style={{
                            marginBottom: 20
                        }}
                        title="Fuel"
                        react={{
                            and: ['Search', 'Publisher', 'Price', 'Brand', 'Odometer', 'Horse Power', 'Location', 'Transmission']
                        }}
                    />

                    <MultiList
                        componentId="Transmission"
                        dataField="transmission.raw"
                        size={100}
                        style={{
                            marginBottom: 20
                        }}
                        title="Location"
                        react={{
                            and: ['Search', 'Publisher', 'Price', 'Brand', 'Odometer', 'Fuel', 'Horse Power', 'Location']
                        }}
                    />

                    <MultiList
                        componentId="Location"
                        dataField="location.raw"
                        size={100}
                        style={{
                            marginBottom: 20
                        }}
                        title="Location"
                        react={{
                            and: ['Search', 'Publisher', 'Price', 'Brand', 'Odometer', 'Fuel', 'Horse Power', 'Transmission']
                        }}
                    />
                </Card>
            </Col>
            <Col span={12}>
                <DataSearch
                    componentId="Search"
                    dataField={['brand', 'model', 'title']}
                    fieldWeights={[4, 3, 1, 2, 1, 1, 1]}
                    fuzziness={1}
                    highlightField={['brand', 'model', 'title']}
                    placeholder="What car are you looking for?"
                    style={{
                        marginBottom: 20,
                        marginLeft: 10,
                    }}
                    title=""
                />

                <SelectedFilters/>
                <div id="result">
                    <ReactiveList
                        componentId="result"
                        dataField="_score"
                        pagination={true}
                        react={{
                            and: ['Search', 'Publisher', 'Price', 'Brand', 'Odometer', 'Fuel', 'Horse Power', 'Location', 'Transmission']
                        }}
                        renderItem={renderItem}
                        size={10}
                        style={{
                            marginTop: 20
                        }}
                        sortOptions={[
                            {
                                dataField: "price_cash",
                                sortBy: "desc",
                                label: "Sort by price (High to Low) \u00A0",
                            },
                            {
                                dataField: "price_cash",
                                sortBy: "asc",
                                label: "Sort by price (Low to High) \u00A0",
                            },
                            {
                                dataField: "registration_date",
                                sortBy: "desc",
                                label: "Sort by car registration date (High to Low) \u00A0",
                            },
                            {
                                dataField: "registration_date",
                                sortBy: "asc",
                                label: "Sort by car registration date (Low to High) \u00A0",
                            },
                        ]}
                    />
                </div>
            </Col>
        </Row>
    </ReactiveBase>
);

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
