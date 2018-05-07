import React from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';

const nodes = [];

['sydney', 'seattle', 'london', 'chicago'].map((location, idx) => {

  for(let i = 0; i < 5; i++) {
    nodes.push({
      id: `${location}-${i}`,
      label: `${location}-${i}`,
      region: idx,
    })
  }
});

const links = []


for(let i = 0; i < 20; i++) {
  // create random links
  const one = Math.round(Math.random() * (nodes.length - 1));
  const two = Math.round(Math.random() * (nodes.length - 1));
  links.push({
    source: nodes[one].id,
    target: nodes[two].id,
    strength: Math.round(Math.random() * 10) / 10,
  })
}

class Visualization extends React.Component {
  componentDidMount() {
    const zoom = d3.zoom().scaleExtent([-1, 10]);
    zoom.on('zoom', this.zoomed);

    const svg = d3.select('#graph').call(zoom);
    this.initSvg();
    svg.append('g').attr('id', 'graphContent');
  }
  initSvg = () => {
    this.initBackground();
    this.initData();
  }
  initBackground = () => {
    const graph = d3.select('#graph');
    const background = graph.append('g').attr('id', 'graphBackground');
    graph.append('g').attr('id', 'graphContent');
    background.append('rect')
      .attr('height', '100%')
      .attr('width', '100%')
      .attr('fill', 'url(#dotPattern)');

  }
  initData = () => {
    function getNodeColor(node) {
      switch(node.region) {
        case 0:
          return '#d12727';
        case 1:
          return '#1065e5';
        case 2:
          return '#3b993d';
        case 3:
          return '#7d3ead';
      }
    }

    const width = window.innerWidth
    const height = window.innerHeight

    const svgContainer = d3.select('#graph');
    svgContainer.attr('width', width).attr('height', height);

    const svg = d3.select('#graphContent')

    // simulation setup with all forces
    const linkForce = d3
      .forceLink()
      .id(function (link) { return link.id })
      .strength(function (link) { return link.strength })

    const simulation = d3
      .forceSimulation()
      .force('link', linkForce)
      .force('charge', d3.forceManyBody().strength(-120))
      .force('center', d3.forceCenter(width / 2, height / 2))

    const linkElements = svg.append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(links)
      .enter().append("line")
        .attr("stroke-width", 1)
        .attr("stroke", "#CCC")

    const nodeElements = svg.append("g")
      .attr("class", "nodes")
      .selectAll("circle")
      .data(nodes)
      .enter().append("circle")
        .attr("r", 10)
        .attr("fill", getNodeColor)

    const textElements = svg.append("g")
      .attr("class", "texts")
      .selectAll("text")
      .data(nodes)
      .enter().append("text")
        .text(function (node) { return  node.label })
        .attr("font-size", 15)
        .attr("dx", 15)
        .attr("dy", 4)
        .attr('fill', getNodeColor)

    simulation.nodes(nodes).on('tick', () => {
      nodeElements
        .attr('cx', function (node) { return node.x })
        .attr('cy', function (node) { return node.y })
      textElements
        .attr('x', function (node) { return node.x })
        .attr('y', function (node) { return node.y })
      linkElements
        .attr('x1', function (link) { return link.source.x })
        .attr('y1', function (link) { return link.source.y })
        .attr('x2', function (link) { return link.target.x })
        .attr('y2', function (link) { return link.target.y })
    })

    simulation.force("link").links(links)

  }
  zoomed = () => {
    const rect = d3.selectAll('#graphContent');
    rect.attr('transform', `translate(${d3.event.transform.x}, ${d3.event.transform.y}) scale(${d3.event.transform.k})`).attr('fill', 'red');
  }
  render() {
    return (
      <div className={this.props.className}>
        <button>+</button><button>-</button>
        <svg id="graph" className={this.props.className} />
        <svg height="5" width="5" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <defs>
            <pattern
              id="dotPattern"
              patternUnits="userSpaceOnUse"
              x="10"
              y="10"
              width="20"
              height="20"
            >
              <rect width="20" height="20" fill="black" x="0" y="0" />
              <circle cx="10" cy="10" r="1" style={{ stroke: 'none', fill: '#444' }} />
            </pattern>
          </defs>

        </svg>
      </div>
    )
  }
}

export default styled(Visualization)`
  & #graph {
    width: 100%;
    height: 100vh;
    padding-bottom: 30px;
    cursor: pointer;
  }
  & .controlPanel {
    position: absolute;
    top: 10px;
    right: 10px;
  }
  & .zoomPanel {
    position: absolute;
    bottom: 100px;
    right: 10px;
  }
  & .zoomPanel > button {
    clear: both;
    display: block;
  }
`;

