import React, { Component } from "react";
import uniq from 'lodash.uniq';

import Collapsible from './Collapsible';

export default class CollapsibleContainer extends Component {
  render() {
    const { order, deep, data } = this.props;
    const filterKey = order[deep];
    const uniqProperties = uniq(data.map(e => e[filterKey]));

    return (
      <div className="collapsible-container">
        {
          uniqProperties.map(property => {
            return (
              <Collapsible
                filterProperty={property}
                key={property}
                deep={deep}
                data={data}
                order={order}
              />
            );
          })
        }
      </div>
    )
  }
}
