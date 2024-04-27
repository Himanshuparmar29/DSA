#include<iostream>

using namespace std;

void shall_sort(int a[],int n){
    for(int span=n/2;span>=1;span/=2){
        for(int j=span;j<n;j++){
            for(int i=j-span;i>=0;i--){
                if(a[i+span]>a[i]){
                    break;
                }
                else{
                    int t=a[i+span];
                    a[i+span]=a[i];
                    a[i]=t;
                }
            }
        }
    }
}

int main()
{
    int a[]={201,71,44,37,30,29,18,4};
    int n=sizeof(a)/sizeof(a[0]);
    shall_sort(a,n);
    for(int i=0;i<n;i++)
    {
        cout<<a[i]<<" ";
    }
}
