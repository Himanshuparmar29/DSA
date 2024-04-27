#include<iostream>

using namespace std;
int flag=1;
class node{
    int info;
    node *left;
    node *right;
    public:
    node(){}
    node(int x):info(x){
        left=NULL;
        right=NULL;
    }
    void insert(int x){
        node * temp=new node(x);
        if(this->left==NULL)
            this->left=temp;
        else if(this->right==NULL)
            this->right=temp;
        else if(flag){
            this->left->insert(x);
            flag=0;
        }
        else {
            this->right->insert(x);
            flag=1;
        }
    }
    void inorder(){
        if(this->left!=NULL)
            this->left->inorder();
        cout<<this->info<<" ";
        if(this->right!=NULL){
            this->right->inorder();
        }
        return;
    }
};

int main()
{
    node *root=new node(29);
    
    root->insert(18);
    root->insert(4);
    root->insert(4);
    root->insert(30);
    root->insert(37);
    root->insert(44);
    root->insert(71);
    root->insert(201);
    root->inorder();
}