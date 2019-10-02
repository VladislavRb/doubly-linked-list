const Node = require('./node');

class LinkedList {
    constructor() {
        this._head = null;
        this._tail = null;
        this.length = 0;
    }

    append(data) {
        if(this.isEmpty()){
            this._head = this._tail = new Node(data);
        }
        else{
            let newNode = new Node(data, this._tail);
            this._tail.next = newNode;
            this._tail = newNode;
        }
        this.length++;
        return this;
    }

    head() {
        return this._head.data;
    }

    tail() {
        return this._tail.data;
    }

    at(index) {
        function findNodeAt(currentNode, currentNodeIndex, nodeIndex){
            if(currentNodeIndex == nodeIndex){
                return currentNode;
            }
            else{
                return findNodeAt(currentNode.next, currentNodeIndex + 1, nodeIndex);
            }
        }
        return findNodeAt(this._head, 0, index).data;
    }

    insertAt(index, data) {
        function findNodeAt(currentNode, currentNodeIndex, nodeIndex){
            if(currentNodeIndex == nodeIndex){
                return currentNode;
            }
            else{
                return findNodeAt(currentNode.next, currentNodeIndex + 1, nodeIndex);
            }
        }

        function setPrevByIndex(setNode, currentNode, currentNodeIndex, nodeIndex){
            if(currentNodeIndex == nodeIndex){
                currentNode.prev = setNode;
            }
            else{
                setPrevByIndex(setNode, currentNode.next, currentNodeIndex + 1, nodeIndex);
            }
        }

        function setNextByIndex(setNode, currentNode, currentNodeIndex, nodeIndex){
            if(currentNodeIndex == nodeIndex){
                currentNode.next = setNode;
            }
            else{
                setNextByIndex(setNode, currentNode.next, currentNodeIndex + 1, nodeIndex);
            }
        }

        if(index){
            let followingNode = findNodeAt(this._head, 0, index);
            let previousNode = findNodeAt(this._head, 0, index - 1);
            let insertedNode = new Node(data, previousNode, followingNode);
            setNextByIndex(insertedNode, this._head, 0, index - 1);
            setPrevByIndex(insertedNode, this._head, 0, index);
            this.length++;
            return this;
        }
        else{
            let insertedNode = new Node(data, null, this._head);
            this._head.prev = insertedNode;
            this._head = insertedNode;
        }
    }

    isEmpty() {
        return this.length == 0;
    }

    clear() {
        this._head = this._tail = new Node();
        this.length = 0;
        return this;
    }

    deleteAt(index) {
        if(this.length < 2){
            this._head = this._tail = new Node();
            this.length = 0;
            return this;
        }
        function deleteAtByIndex(currentNode, currentNodeIndex, nodeIndex){
            if(currentNodeIndex == nodeIndex){
                [currentNode.prev.next, currentNode.next.prev] = [currentNode.next, currentNode.prev];
            }
            else{
                deleteAtByIndex(currentNode.next, currentNodeIndex + 1, nodeIndex);
            }
        }
        deleteAtByIndex(this._head, 0, index);
        this.length--;
        return this;
    }

    reverse() {
        if(this.length > 1){
            function swapInside(currentNode, counter, end){
                if(counter != end){
                    [currentNode.next, currentNode.prev] = [currentNode.prev, currentNode.next];
                    swapInside(currentNode.prev, counter + 1, end);
                }
            }
            swapInside(this._head.next, 0, this.length - 1);
            [this._head, this._tail] = [this._tail, this._head];
        }
        return this;
    }

    indexOf(data) {
        function fillWithData(arr, currentNode){
            arr.push(currentNode.data);
            if(currentNode.next == null){
                return arr;
            }
            else{
                return fillWithData(arr, currentNode.next);
            }
        }
        let datas = fillWithData([], this._head);
        return datas.indexOf(data);
    }
}

module.exports = LinkedList;
