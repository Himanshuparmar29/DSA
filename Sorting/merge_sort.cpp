#include<iostream>

using namespace std;
void conquer(int a[],int si,int mid,int ei){
    int s=ei-si+1;
    int merged[s];
    int idx1=si;
    int idx2=mid+1;
    int x=0;
    while(idx1<=mid && idx2<=ei){
        if(a[idx1]>=a[idx2]){
            merged[x++]=a[idx2++];
        }
        else{
            merged[x++]=a[idx1++];
        }
    }
    while(idx1<=mid){
        merged[x++]=a[idx1++];
    }
    while(idx2<=ei){
        merged[x++]=a[idx2++];
    }
    for(int i=0,j=si;i<s;i++,j++){
        a[j]=merged[i];
    }
}

void divide(int a[],int si,int ei){
    if(si>=ei)
        return;
    int mid=si+(ei-si)/2;
    divide(a,si,mid);
    divide(a,mid+1,ei);
    conquer(a,si,mid,ei);
}


int main()
{
    int a[]={201,71,44,37,30,29,18,4};
    int n=sizeof(a)/sizeof(a[0]);
    divide(a,0,n-1);
    for(int i=0;i<n;i++)
    {
        cout<<a[i]<<" ";
    }
}