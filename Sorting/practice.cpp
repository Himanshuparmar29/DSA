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
void shall(int a,int n)
{
    for(int span=n/2;span>=1;span=span/2){
        
    }
}
int main()
{
    int a[] = {201, 71, 44, 37, 29, 18, 4};
    int n = sizeof(a) / sizeof(a[0]);
    divide(a,0,n-1);
    display(a,n);
}