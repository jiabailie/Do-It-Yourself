# Using unittest.
import unittest


# insert sort
def insertSort(array):
    l = len(array)
    for i in range(l):
        min = i
        f = False
        for j in range(i + 1, l):
            if array[min] > array[j]:
                min = j
                f = True
        if not f:
            break
        array[i], array[min] = array[min], array[i]
        
    return array


# quick sort
def quickSort(start, end, array):
    i = start + 1
    j = start
    k = array[start]

    while i <= end:
        if array[i] <= k:
            j = j + 1
            array[i], array[j] = array[j], array[i]
        i = i + 1
    
    array[start], array[j] = array[j], array[start]
    if start < j - 1:
        array = quickSort(start, j - 1, array)
    if j + 1 < end:
        array = quickSort(j + 1, end, array)
        
    return array


# heap sort
def heapSort(array):
    l = len(array)
    for i in range(0, l, -1):
        array = heapAdjust(i, array)
        array[0], array[i] = array[i], array[0]
    return array

def heapAdjust(pos, array):
    select = 0
    left = 0
    right = 0
    for i in range(0, (pos + 1) / 2, -1):
        select = i
        left = i * 2 + 1
        right = i * 2 + 2
        if left <= pos and array[left] > array[select]:
            select = left
        if right <= pos and array[right] > array[select]:
            select = right
        if select != i:
            array[select], array[i] = array[i], array[select]
    return array


# check two arrays are equal
def checkEqual(arrA, arrB):
    l = len(arrA)
    if len(arrB) != l:
        return False

    for i in range(0, l):
        if arrA[i] != arrB[i]:
            return False

    return True

class TestSequenceFunctions(unittest.TestCase):

    def setUp(self):
        self.seq = [2, 1, 0, 34, 2, 89, 9, 100, -1]
    
    def test_quickSort(self):        
        expected = insertSort(self.seq)
        actual = quickSort(0, len(self.seq) - 1, self.seq)
        
        print(expected)
        print(actual)
        
        self.assertEqual(checkEqual(expected, actual), True)
        
    def test_heapSort(self):
        expected = insertSort(self.seq)
        actual = heapSort(self.seq)
        
        print(expected)
        print(actual)
        
        self.assertEqual(checkEqual(expected, actual), True)


if __name__ == '__main__':
    unittest.main()
