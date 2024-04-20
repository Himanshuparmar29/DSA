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
int main()
{
    int arr[]={201,71,44,37,29,18,4};
    // int arr[]={1,2,3,4,5,6,7};
    int flag=0;
    int n=7;
    for(int i=0;i<n-1;i++)
    {
        for(int j=0;j<n-1-i;j++)
        {
            if(arr[j]>arr[j+1])
            {
                int t=arr[j];
                arr[j]=arr[j+1];
                arr[j+1]=t;
                flag=1;
            }
        }
        display(arr,n);
        if(!flag){
            break;
        }
        
    }
}