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

void quickSort(int a[], int d, int u) {
    if (d >= u) {
        return;
    }
    int temp = d;
    int pi = a[d];
    int left = d + 1;
    int right = u;

    while (left <= right) {
        while (left <= right && a[left] <= pi) {
            left++;
        }
        while (left <= right && a[right] > pi) {
            right--;
        }
        if (left < right) {
            swap(a[left], a[right]);
        }
    }
    swap(a[temp], a[right]);

    quickSort(a, d, right - 1);
    quickSort(a, right + 1, u);
}
int main()
{
    int arr[]={201,71,44,37,29,18,4};
    int s=7;
    quickSort(arr,0,6);
    display(arr,s);
}