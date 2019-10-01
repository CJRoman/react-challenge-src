import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import CollapsibleContainer from './CollapsibleContainer';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';

const capitalizeFirst = (string) => { return string.charAt(0).toUpperCase() + string.slice(1) };

const SortableItem = SortableElement(({ value }) => <li className="sortable-element">{capitalizeFirst(value)}</li>);

const SortableList = SortableContainer(({ items }) => {
  return (
    <ul className="sortable">
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </ul>
  );
});

class App extends Component {
  state = {
    data: [],
    order: ['color', 'mood', 'size', 'shape', 'material'],
  }

  async componentDidMount() {
    const response = await axios.get('https://gist.githubusercontent.com/CJRoman/53790acd766cd2820da6bbf884235cec/raw/5e392796d26c956c2585c1a29a1d4ead1487fb63/items.json');
    this.setState({
      data: response.data
    })
  }

  updateOrder = ({ oldIndex, newIndex }) => {
    this.setState(({ order }) => ({
      order: arrayMove(order, oldIndex, newIndex),
    }));
  }

  render() {
    return (
      <div className="App">
        <SortableList axis="x" items={this.state.order} onSortEnd={this.updateOrder} />
        <CollapsibleContainer
          data={this.state.data}
          order={this.state.order}
          deep={0}
          />
      </div>
    );
  }
}

export default App;
