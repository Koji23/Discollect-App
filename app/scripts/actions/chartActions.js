import fetch from 'isomorphic-fetch';

// const baseUrl = 'http://ec2-54-186-167-115.us-west-2.compute.amazonaws.com';
const baseUrl = 'http://discollect-dev-portal.herokuapp.com';

const optimisticSetChart = ({ data, labels, label }) => (
  {
    type: 'GET_CHART',
    data,
    labels,
    label,
  }
);

const optimisticChartType = (chartType) => (
  {
    type: 'GET_CHART_TYPE',
    chartType,
  }
);

const optimisticSetMap = (areas) => (
  {
    type: 'GET_MAP',
    areas,
  }
);


const chartActions = {


  getMapData: () => (
    (dispatch) => {
      const randNum = () => (
        (Math.random() * 100) + (Math.random() * 200) + (Math.random() * 200)
      );
      const areas = {
        CA: randNum(),
        MD: randNum(),
        CT: randNum(),
        NY: randNum(),
        AZ: randNum(),
        UT: randNum(),
        IL: randNum(),
        MI: randNum(),
        NH: randNum(),
        FL: randNum(),
        SD: randNum(),
        MA: randNum(),
        AL: randNum(),
        ND: randNum(),
        IN: randNum(),
        MS: randNum(),
        TX: randNum(),
        TN: randNum(),
      };
      dispatch(optimisticSetMap(areas));

    }
  ),

  getChartType: (info) => (
    (dispatch) => {
      const chartType = info.type;
      dispatch(optimisticChartType(chartType));
    }
  ),

  getChartCatsData: (criteria) => (
    (dispatch) => {
      const cat1 = criteria.cat1;
      const cat2 = criteria.cat2;
      const cat3 = criteria.cat3;
      const cat4 = criteria.cat4;
      const cat5 = criteria.cat5;
      const cat6 = criteria.cat6;
      const timeFrame = criteria.dateRange;
      const url = `${baseUrl}/api/discollect/time/category?
        cat=${cat1}&cat=${cat2}&cat=${cat3}&cat=${cat4}&cat=${cat5}&cat=${cat6}&&past=${timeFrame}`;
      fetch(url, {
        credentials: 'same-origin',
      })
      .then((res) => res.json())
      .then((response) => {
        dispatch(optimisticSetChart(response));
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
    }),

  getChartSingleData: (criteria) => (
    (dispatch) => {
      const cat1 = criteria.singleCat;
      const timeFrame = criteria.dateRange;
      const url = `${baseUrl}/api/discollect/category/time?cat=${cat1}&past=${timeFrame}`;
      fetch(url, {
        credentials: 'same-origin',
      })
      .then((res) => res.json())
      .then((response) => {
        dispatch(optimisticSetChart(response));
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  ),
};


export default chartActions;
