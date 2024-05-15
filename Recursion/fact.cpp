#include<iostream>

using namespace std;
int fact(int x){
    if(x==0 || x== 1)
    {
        return 1;
    }
    return x*fact(x-1);
}
int main()
{
    cout<<fact(6);
}x