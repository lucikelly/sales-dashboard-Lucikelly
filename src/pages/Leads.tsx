import {
  Header,
  CardComponent,
  FormComponent,
  StyledButton,
  StyledH2,
  CustomTable,
  StyledSpan,
  StyledP
} from '@/components'

import { Container, Grid } from '@mui/material'
import { useFormValidation, useGet, usePost, useDelete } from '@/hooks'
import { InputProps, LeadsData, LeadsPostData, MessageProps } from '@/types'
import { ChangeEvent, useState, useEffect } from 'react'



function Leads() {

  const inputs: InputProps[] = [
    { name: 'name', type: 'text', placeholder: 'Nome', required: true },
    { name: 'email', type: 'email', placeholder: 'Email', required: true },
    { name: 'telefone', type: 'tel', placeholder: 'Telefone', required: true },
  ]

  const { formValues, formValid, handleChange } = useFormValidation(inputs)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await createLeadsPostData({
      name: String(formValues[0]),
      email: String(formValues[1]),
      phone: String(formValues[2]),
    })
    
  }

  const handleDelete = async (id: number) => {
    if( confirm('Tem certeza que deseja excluir seu lead')) {
      try {
        await leadsDeleteData({params: {id: id}})
        alert('Lead deletado com sucesso!')
        getLeads()
      } catch (e) {
        alert(
          'Não foi possível realizar a operação. Entre em contato com nosso suporte'
        )
      }
    }
  }

  const {
    data: createLeadsData, 
    loading: createLeadsLoading,  
    error: createLeadsError, 
    postData: createLeadsPostData,
  } =  usePost<LeadsData, LeadsPostData>('leads/create', true)

  const {
    data: leadsData,
    loading: leadsLoading,
    error: leadsError,
    getData: getLeads,
  } = useGet<LeadsData[]>('leads')

  const {
    deleteData: leadsDeleteData,
    loading: leadsDeleteLoading,
  } = useDelete('leads/delete')

  const [createMessage, setCreateMessage] = useState <MessageProps>({
    type:'success',
    msg: ''
  })

  const clearMessage = () => {
    setTimeout(() => {
      setCreateMessage({
        type: 'success',
        msg:'',
      })
    },3000)
  }

  useEffect(()=>{
    if (createLeadsData?.id) {
      setCreateMessage ({
        msg: 'Lead criado com sucesso',
        type:'success'
      })
      getLeads()
      clearMessage()
    } else if (createLeadsError) {
      setCreateMessage ({
        msg: 'Não foi possível realizar a operação. Entre em contato com nosso suporte',
        type:'error'
      })
    } else {
      clearMessage()
    }
  },[createLeadsData, createLeadsError])

  return (
    <>
      <Header />
      <Container className="mb-2" maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={7}>
            <CardComponent
              className={
                leadsLoading ? 'skeleton-loading skeleton-loading-mh-1' : ''
              }
            >
              {!leadsError && !leadsLoading && (
                <>
                  <StyledH2 className="mb-1"> Meus leads</StyledH2>
                  {leadsData?.length ? (
                    <CustomTable
                      headers={['Nome', 'Email', 'Telefone', '']}
                      rows={leadsData.map((lead) => [
                        <StyledP>{lead.name}</StyledP>,
                        <StyledP>{lead.email}</StyledP>,
                        <StyledP>{lead.phone}</StyledP>,
                        <StyledButton
                          className="borderless-alert"
                          onClick={() => handleDelete(lead.id)}
                          disabled={leadsDeleteLoading}
                        >
                          Excluir
                        </StyledButton>,
                      ])}
                    />
                  ) : (
                    <StyledSpan> Sem Leads cadastrados</StyledSpan>
                  )}
                </>
              )}
            </CardComponent>
          </Grid>
          <Grid item xs={12} sm={5}>
            <CardComponent>
              <StyledH2 className="mb-1"> Cadastrar leads</StyledH2>
              <FormComponent
                inputs={inputs.map((input, index) => ({
                  ...input,
                  type: input.type,
                  placeholder: input.placeholder,
                  value: formValues[index] || '',
                  onChange: (e: ChangeEvent<HTMLInputElement>) =>
                    handleChange(index, (e.target as HTMLInputElement).value),
                }))}
                buttons={[
                  {
                    className: 'primary',
                    disabled:
                      !formValid || createLeadsLoading || leadsDeleteLoading,
                    type: 'submit',
                    onClick: handleSubmit,
                    children: 'Cadastrar lead',
                  },
                ]}
                message={createMessage}
              />
            </CardComponent>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}
export default Leads
