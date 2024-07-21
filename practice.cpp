#include <iostream>

using namespace std;

void display(int a[], int n)
{
    for (int i = 0; i < n; i++)
    {
        cout << a[i] << " ";
    }
    cout << endl;
}
int bs(int a[],int lb,int ub,int key)
{
    if(lb>ub)
    {
        return -1;
    }
    int mid=lb+(ub-lb)/2;
    if(a[mid]==key) return 1;
    else if(a[mid]<key) return bs(a,lb,mid-1,key);
    else return bs(a,mid+1,ub,key);
    return -1;
}
int main()
{
    int arr[] = {201, 71, 44, 37, 29, 18, 4};
    int n = sizeof(arr) / sizeof(arr[0]);
    cout<<bs(arr,0,n-1,2011);
}