import { supabase } from '../config/supabase.js';

// Get all transactions (combined from transactions_history and payment_history)
export const getAllTransactions = async (req, res) => {
  try {
    const [txnResult, paymentResult] = await Promise.all([
      supabase
        .from('transactions_history')
        .select('*')
        .order('created_at', { ascending: false }),
      supabase
        .from('payment_history')
        .select('*')
        .order('payment_date', { ascending: false })
    ]);

    if (txnResult.error) throw txnResult.error;
    if (paymentResult.error) throw paymentResult.error;

    const combinedTransactions = [
      ...(txnResult.data || []).map(t => ({
        id: t.id,
        type: 'transaction',
        doctor_id: t.doctor_id,
        patient_id: t.patient_id,
        amount: t.amount,
        status: t.operation_status,
        created_at: t.created_at,
        booking_id: t.booking_id,
        operation_id: t.operation_id,
      })),
      ...(paymentResult.data || []).map(p => ({
        id: p.id,
        type: 'payment',
        doctor_id: p.doctor_id,
        patient_id: p.patient_id,
        amount: p.total_amount,
        status: p.operation_status,
        created_at: p.payment_date,
        booking_id: p.booking_id,
        action_type: p.action_type,
      }))
    ];

    combinedTransactions.sort((a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    res.json({
      success: true,
      data: combinedTransactions,
      count: combinedTransactions.length
    });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching transactions',
      error: error.message
    });
  }
};

// Get transactions history only
export const getTransactionsHistory = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('transactions_history')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({
      success: true,
      data,
      count: data?.length || 0
    });
  } catch (error) {
    console.error('Error fetching transactions history:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching transactions history',
      error: error.message
    });
  }
};

// Get payment history only
export const getPaymentHistory = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('payment_history')
      .select('*')
      .order('payment_date', { ascending: false });

    if (error) throw error;

    res.json({
      success: true,
      data,
      count: data?.length || 0
    });
  } catch (error) {
    console.error('Error fetching payment history:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching payment history',
      error: error.message
    });
  }
};

// Get transaction by ID
export const getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('transactions_history')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }

    res.json({
      success: true,
      data
    });
  } catch (error) {
    console.error('Error fetching transaction:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching transaction',
      error: error.message
    });
  }
};

// Get transaction statistics
export const getTransactionStats = async (req, res) => {
  try {
    const [txnResult, paymentResult] = await Promise.all([
      supabase.from('transactions_history').select('amount, operation_status'),
      supabase.from('payment_history').select('total_amount, operation_status')
    ]);

    if (txnResult.error) throw txnResult.error;
    if (paymentResult.error) throw paymentResult.error;

    const allTransactions = [
      ...(txnResult.data || []).map(t => ({ amount: t.amount, status: t.operation_status })),
      ...(paymentResult.data || []).map(p => ({ amount: p.total_amount, status: p.operation_status }))
    ];

    const stats = {
      totalTransactions: allTransactions.length,
      totalAmount: allTransactions.reduce((sum, t) => sum + (t.amount || 0), 0),
      successfulTransactions: allTransactions.filter(t => t.status === 'success').length,
      pendingTransactions: allTransactions.filter(t => t.status === 'waiting').length,
      failedTransactions: allTransactions.filter(t => t.status === 'failed').length
    };

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error fetching transaction stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching transaction statistics',
      error: error.message
    });
  }
};

// Get transactions by doctor ID
export const getTransactionsByDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const { data, error } = await supabase
      .from('transactions_history')
      .select('*')
      .eq('doctor_id', doctorId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({
      success: true,
      data,
      count: data?.length || 0
    });
  } catch (error) {
    console.error('Error fetching doctor transactions:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching doctor transactions',
      error: error.message
    });
  }
};

// Get transactions by patient ID
export const getTransactionsByPatient = async (req, res) => {
  try {
    const { patientId } = req.params;

    const { data, error } = await supabase
      .from('transactions_history')
      .select('*')
      .eq('patient_id', patientId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({
      success: true,
      data,
      count: data?.length || 0
    });
  } catch (error) {
    console.error('Error fetching patient transactions:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching patient transactions',
      error: error.message
    });
  }
};
