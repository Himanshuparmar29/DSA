#include <iostream>
#include<vector>
using namespace std;

void display(int a[], int n)
{
    for (int i = 0; i < n; i++)
    {
        cout << a[i] << " ";
    }
    cout << endl;
}
int maxnum(int a[],int n)
{
    int max=a[0];
    for(int i=0;i<n;i++)
    {
        if(a[i]>max)
        {
            max=a[i];
        }
    }
    return max;
}
void countingsort(int a[],int n,int ex)
{
    vector<int> output(n,0);
    vector<int> count(10,0);

    for(int i=0;i<n;i++)
    {
        count[(a[i]/ex)%10]++;
    }

    for(int i=1;i<10;i++)
    {
        count[i]+=count[i-1];
    }
    for(int i=n-1;i>=0;i--)
    {
        output[--count[(a[i]/ex)%10]]=a[i];
    }
    for(int i=0;i<n;i++)
    {
        a[i]=output[i];
    }
}
void radix(int a[],int n)
{
    int max=maxnum(a,n);
    for(int ex=1;max/ex>0;ex*=10)
    {
        countingsort(a,n,ex);
    }
}
int main()
{
    int a[] = {201, 71, 44, 37, 29, 18, 4};
    int n = sizeof(a) / sizeof(a[0]);
    radix(a,n);
    display(a,n);
}