#include<iostream>

using namespace std;

class node
{
    public:
    int info;
    node *left;
    node *right;
    node(){}
    node(int x):info(x){
        left=NULL;
        right=NULL;
    }
    void append(int x){
        node *t=new node(x);
        if(this->info>x){
            if(this->left==NULL){
                this->left=t;
            }
            else{
                this->left->append(x);
            }
        }
        else{
            if(this->right==NULL)
            {
                this->right=t;
            }
            else{
                this->right->append(x);
            }
        }
    }
    void intra()
    {
        if(this->left!=NULL){
            this->left->intra();
        }
        cout<<this->info<<" ";
        if(this->right!=NULL)
        {
            this->right->intra();
        }
    }
};

int main()
{
    node *root=new node(29);
    root->append(18);
    root->intra();
}