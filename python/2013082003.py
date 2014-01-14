class Node:
    def __init__(self, value=None, left=None, right=None):
        self.value = value
        self.left = left
        self.right = right

def preTraverse(root):
    if root == None:
        return
    print(root.value)
    preTraverse(root.left)
    preTraverse(root.right)

def midTraverse(root):
    if root == None:
        return
    midTraverse(root.left)
    print(root.value)
    midTraverse(root.right)

def postTraverse(root):
    if root == None:
        return
    postTraverse(root.left)
    postTraverse(root.right)
    print(root.value)

if __name__ == '__main__':
    root = Node('D', Node('B', Node('A'), Node('C')), Node('E', right = Node('G', Node('F'))))
    print ("preTraverse:")
    preTraverse(root)
    print ("midTraverse:")
    midTraverse(root)
    print ("postTraverse:")
    postTraverse(root)
