import { Document, Page, pdf, Text, View } from '@react-pdf/renderer';
import React from 'react';

import { createContext, useContext } from 'react';

const context = createContext();

export const PdfGenerator = () => useContext(context);

export default function PdfContext({ children }) {
  
  const generateAndSavePDF = async (salaryData) => {
    try {
      const {
        empid,
        salaryYear,
        salaryMonth,
        salaryAmount,
        basicsalary,
        hrAllowance,
        daAllowance,
        leaveAmount,
      } = salaryData;
      const fileName = `salary_${empid}_${salaryYear}_${salaryMonth}.pdf`;

      // PDF content to be rendered
      const pdfContent = (
        <Document>
          <Page style={styles.page}>
            <View style={styles.header}>
              <Text style={styles.companyName}>Your Company Name</Text>
            </View>
            <View style={styles.content}>
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <View style={styles.tableCell}>
                    <Text style={styles.tableHeader}>Employee ID</Text>
                    <Text>{empid}</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text style={styles.tableHeader}>Salary Month</Text>
                    <Text>{salaryMonth}/{salaryYear}</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.tableCell}>
                    <Text style={styles.tableHeader}>Description</Text>
                    <Text>Basic Salary</Text>
                    <Text>HR Allowance</Text>
                    <Text>DA Allowance</Text>
                    <Text>Leave Amount Deducted</Text>
                    <Text>Total Salary</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text style={styles.tableHeader}>Amount</Text>
                    <Text>{basicsalary}</Text>
                    <Text>{hrAllowance}</Text>
                    <Text>{daAllowance}</Text>
                    <Text>{leaveAmount}</Text>
                    <Text>{salaryAmount}</Text>
                  </View>
                </View>
              </View>
            </View>
            <Text style={styles.sign}>*This is a computer generated slip does not required physical signature</Text>
          </Page>
        </Document>
      );

      // Generate the PDF
      const blob = await pdf(pdfContent).toBlob();

      // Create a URL for the PDF blob
      const pdfUrl = URL.createObjectURL(blob);

      // Download the PDF
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = fileName;
      link.click();

      // Revoke the URL to free up resources
      URL.revokeObjectURL(pdfUrl);

      alert('PDF generated and downloaded successfully!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again later.');
    }
  };

  // Styles for the PDF
  const styles = {
    page: {
      padding: 30,
      fontSize: 12,
    },
    header: {
      textAlign: 'center',
      marginBottom: 20,
    },
    companyName: {
      fontSize: 22,
      fontWeight: 'bold',
      color: 'red',
    },
    content: {
      marginTop: 10,
      textAlign: 'center',
    },
    table: {
      display: 'table',
      width: '100%',
    },
    tableRow: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#000',
      borderBottomStyle: 'solid',
    },
    tableCell: {
      width: '50%',
      padding: 5,
    },
    tableHeader: {
      fontSize: 12,
      fontWeight: 'bold',
      marginBottom: 5,
      color:'orange'
    },
    sign:{
        marginTop:10,
        color: 'red',
    }
  };

  return (
    <context.Provider value={{ generateAndSavePDF }}>
      {children}
    </context.Provider>
  );
}
