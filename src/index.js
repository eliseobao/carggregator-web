
import React from 'react';
import ReactDOM from 'react-dom';

import {
    ReactiveBase,
    DataSearch,
    MultiList,
    SelectedFilters,
    ReactiveList
} from '@appbaseio/reactivesearch';
import {
    Row,
    Button,
    Col,
    Card,
} from 'antd';
import 'antd/dist/antd.css';


import createDOMPurify from 'dompurify';

const DOMPurify = createDOMPurify(window);

function getNestedValue(obj, path) {
    const keys = path.split('.');
    const currentObject = obj;
    const nestedValue = keys.reduce((value, key) => {
        if (value) {
            return value[key];
        }
        return '';
    }, currentObject);
    if (typeof nestedValue === 'object') {
        return JSON.stringify(nestedValue);
    }
    return nestedValue;
}

function renderItem(res, triggerClickAnalytics) {
    let { image, url, description, title } = {"title":"brand","description":"model","image":"","url":"url","showRest":false};
    image = getNestedValue(res,image);
    title = getNestedValue(res,title);
    url = getNestedValue(res,url);
    description = getNestedValue(res,description)
    return (
        <Row onClick={triggerClickAnalytics} type="flex" gutter={16} key={res._id} style={{margin:'20px auto',borderBottom:'1px solid #ededed'}}>
            <Col span={image ? 6 : 0}>
                {image &&  <img src={image} alt={title} /> }
            </Col>
            <Col span={image ? 18 : 24}>
                <h3 style={{ fontWeight: '600' }} dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(title || 'Choose a valid Title Field') }}/>
                <p style={{ fontSize: '1em' }} dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(description || 'Choose a valid Description Field')}}/>
            </Col>
            <div style={{padding:'20px'}}>
                {url ? <Button shape="circle" icon="link" style={{ marginRight: '5px' }} onClick={() => window.open(url, '_blank')} />
                    : null}
            </div>
        </Row>
    );
};

const App = () => (
    <ReactiveBase
        app="carggregator-2022-10"
        credentials="null"
        url="http://localhost:9200"
        analytics={false}
        searchStateHeader
    >
        <Row gutter={16} style={{ padding: 20 }}>
            <Col span={12}>
                <Card>
                    <MultiList
                        componentId="list-2"
                        dataField="brand.keyword"
                        size={100}
                        style={{
                            marginBottom: 20
                        }}
                        title="Brand"
                    />
                    <MultiList
                        componentId="list-4"
                        dataField="fuel.keyword"
                        showSearch={false}
                        size={100}
                        style={{
                            marginBottom: 20
                        }}
                        title="Fuel"
                    />
                    <MultiList
                        componentId="list-5"
                        dataField="location.keyword"
                        size={100}
                        style={{
                            marginBottom: 20
                        }}
                        title="Location"
                    />
                </Card>
            </Col>
            <Col span={12}>
                <DataSearch
                    componentId="search"
                    dataField={[
                        'brand',
                        'model',
                        'version'
                    ]}
                    fieldWeights={[
                        1,
                        1,
                        1,
                        1,
                        1
                    ]}
                    fuzziness={1}
                    highlight={true}
                    highlightField={[
                        'brand',
                        'model',
                        'version'
                    ]}
                    placeholder="What car are you looking for?"
                    style={{
                        marginBottom: 20
                    }}
                />

                <SelectedFilters />
                <div id="result">
                    <ReactiveList
                        componentId="result"
                        dataField="_score"
                        pagination={true}
                        react={{
                            and: [
                                'search',
                                'list-2',
                                'list-4',
                                'list-5'
                            ]
                        }}
                        renderItem={renderItem}
                        size={10}
                        style={{
                            marginTop: 20
                        }}
                    />
                </div>
            </Col>

        </Row>
    </ReactiveBase>
);

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
