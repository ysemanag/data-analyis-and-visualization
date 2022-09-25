/**
 * quick sort implementation
 *
 *@author George Abot Abraham Ret
 *@version 1.0, 03/09/2021
 */

public class QuickSort{
  // partitioning point
  private static int partition(int [] numbers, int start, int end){
    int pivot = numbers[end];
    int leftPointer = start;
    int rightPointer = end;

    while(leftPointer < rightPointer){

      while(numbers[leftPointer] <= pivot && leftPointer < rightPointer){
        leftPointer++;
      }

      while(numbers[rightPointer] > pivot && leftPointer < rightPointer) {
        rightPointer--;
      }
     swap(numbers, leftPointer, rightPointer);
    }
    swap(numbers, leftPointer, end);

    return leftPointer;

  }

// recursive  calls on the array
public static void quickSort(int [] numbers, int start, int end){

  if(start >= end ){
    return;
  }
  int location = partition(numbers, start, end);
  quickSort(numbers, start, location - 1);
  quickSort(numbers, location + 1, end);
}

// swaping values
  private static  void  swap(int [] numbers, int leftPointer, int rightPointer){
    int temp = numbers[leftPointer];
    numbers[leftPointer] = numbers[rightPointer];
    numbers[rightPointer] = temp;
  }

// printing the values
  public static void printArray(int [] numbers){
    for(int number: numbers){
        System.out.print(number + " ");
    }
    System.out.println();
  }
}
