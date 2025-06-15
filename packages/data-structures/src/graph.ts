import { Dictionary } from "./dictionary";
import { Queue } from "./queue";
import { Colors } from "./utils";
import { Stack } from "./stack";

/**
 * 图，directed是有向图和无向图的标识
 */
export class Graph {
  [x: string]: any;

  constructor(isDirected = false) {
    this.isDirected = isDirected;
    this.vertices = []; // 数组存储所有顶点
    this.adjList = new Dictionary(); // 字典存储邻接表，字典将会使用顶点的名字作为键，邻接顶点列表作为值。
  }

  /**
   * 添加顶点
   */
  addVertex(v: any) {
    if (this.vertices.includes(v)) {
      return;
    }
    this.vertices.push(v);
    this.adjList.set(v, []);
  }

  /**
   * 添加边
   */
  addEdge(v: any, w: any) {
    if (!this.adjList.get(v)) {
      this.addVertex(v);
    }
    if (!this.adjList.get(w)) {
      this.addVertex(w);
    }
    this.adjList.get(v).push(w);
    if (!this.isDirected) {
      this.adjList.get(w).push(v);
    }
  }

  getVertices() {
    return this.vertices;
  }
  getAdjList() {
    return this.adjList;
  }

  // 遍历每个节点，然后从字典中逐个遍历该节点对应的连接节点
  toString() {
    let s = "";
    for (let i = 0; i < this.vertices.length; i++) {
      s += `${this.vertices[i]} -> `;
      const neighbors = this.adjList.get(this.vertices[i]);
      for (let j = 0; j < neighbors.length; j++) {
        s += `${neighbors[j]} `;
      }
      s += "\n";
    }
    return s;
  }
}

export const initializeColor = (vertices: any[]) => {
  const color: any = {};
  for (let i = 0; i < vertices.length; i++) {
    color[vertices[i]] = Colors.WHITE;
  }
  return color;
};

/**
 * 广度优先遍历，BFS
 * @param graph 图
 * @param startVertex 开始顶点
 * @param callback
 */
export const breadFirstSearch = (
  graph: any,
  startVertex: any,
  callback?: any
) => {
  const vertices = graph.getVertices();
  const adjList = graph.getAdjList();
  const color = initializeColor(vertices);

  const distance: any = {}; // 距离startVertex顶点的距离
  const predecessors: any = {}; // 顶点的父顶点集合
  // 根据图顶点集合初始化 distance 和 predecessors
  for (let i = 0, len = vertices.length; i < len; i++) {
    distance[vertices[i]] = 0;
    predecessors[vertices[i]] = null;
  }

  const queue = new Queue();
  queue.enqueue(startVertex);
  while (!queue.isEmpty()) {
    const u = queue.dequeue();
    color[u] = Colors.GREY; // 标记为灰色，被发现，未被探索
    const neighbors = adjList.get(u);
    for (let i = 0, len = neighbors.length; i < len; i++) {
      const w = neighbors[i];
      if (color[w] === Colors.WHITE) {
        color[w] = Colors.GREY;
        distance[w] = distance[u] + 1; // 将被发现的顶点更新与startVertex顶点的距离
        predecessors[w] = u; // 将被发现的顶点的父顶点记录下来
        queue.enqueue(w);
      }
    }
    color[u] = Colors.BLACK;
    if (callback) {
      callback(u);
    }
  }

  return {
    distance,
    predecessors,
  };
};

/**
 * 根据 BFS 输出给定startVertex顶点的路径
 * 可以延伸，根据结果比较出最短路径
 * @param graph
 * @param startVertex
 * @param callback
 */
export const pathByBFS = (graph: any, startVertex: any, callback?: any) => {
  const { predecessors } = breadFirstSearch(graph, startVertex, callback);

  const vertices = graph.getVertices();

  // 除 startVertex顶点外，遍历图所有其他顶点
  for (
    let i = 0, len = vertices.length;
    i < len && vertices[i] !== startVertex;
    i++
  ) {
    let flag = false; // 用来标记顶点路径中是否存在startVertex顶点
    let toVertex = vertices[i];
    const stack = new Stack();

    while (predecessors[toVertex]) {
      stack.push(toVertex);
      if (predecessors[toVertex] !== startVertex) {
        toVertex = predecessors[toVertex];
      } else {
        stack.push(predecessors[toVertex]);
        flag = true;
        break;
      }
    }
    if (!flag) {
      // 不存在含有startVertex顶点的路径，则清空栈
      stack.clear();
    } else {
      // 打印startVertex顶点的路径
      let s = stack.pop();
      while (!stack.isEmpty()) {
        s += " - " + stack.pop();
      }
      console.log(s);
    }
  }
};
