import React, { Component } from "react";
import './styles.css';
import CollapsibleContainer from "..";

export default class Collapsible extends Component {
  state = {
    opened: false
  }

  toggleOpen = () => {
    this.setState({
      opened: !this.state.opened
    });
  }

  renderNextLevel = (data, filteredProperty, deep, order) => {
    const filteredData = data.filter(e => e[order[deep]] === filteredProperty);
    return <CollapsibleContainer data={filteredData} deep={deep + 1} order={order} />
  }

  renderItems = (data) => {
    return (
      <ul>
        {data.map(e => <li key={e.name}>{e.name}</li>)}
      </ul>
    );
  }

  render() {
    const { filterProperty, deep, order, data } = this.props;

    return (
      <div className={`collapsible level-${deep}`}>
        <header className="collapsible__header" onClick={this.toggleOpen}>{filterProperty}</header>
        {this.state.opened &&
          <div className="collapsible__body">
            {deep === (order.length - 1) ? this.renderItems(data) : this.renderNextLevel(data, filterProperty, deep, order)}
          </div>
        }
      </div>
    )
  }
}
