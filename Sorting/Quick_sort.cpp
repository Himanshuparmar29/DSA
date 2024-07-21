#include<iostream>

using namespace std;

void display(int a[],int n)
{
    for(int i=0;i<n;i++)
    {
        cout<<a[i]<<" ";
    }
    cout<<endl;
}

void quickSort(int a[], int d, int u)
{
    if (d >= u)
    {
        return;
    }
    int mid = d + (u - d) / 2;
    int pivot = a[mid];
    swap(a[mid], a[u]); 
    int left = d;
    int right = u - 1;

    while (left <= right)
    {
        while (left <= right && a[left] <= pivot)
        {
            left++;
        }
        while (left <= right && a[right] > pivot)
        {
            right--;
        }
        if (left < right)
        {
            swap(a[left], a[right]);
        }
    }
    swap(a[left], a[u]); 
    quickSort(a, d, left - 1);
    quickSort(a, left + 1, u);
}
int main()
{
    int arr[]={201,71,44,37,29,18,4};
    int s=7;
    quickSort(arr,0,6);
    display(arr,s);
}