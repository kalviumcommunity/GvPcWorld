import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { 
  Paper, 
  Typography, 
  Button, 
  Box, 
  Divider,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Chip
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ComputerIcon from '@mui/icons-material/Computer';

const CartItem = ({ pc, onRemove }) => {
  return (
    <Paper 
      elevation={2} 
      sx={{ 
        mb: 2, 
        p: 2,
        bgcolor: 'background.paper',
        borderRadius: 2
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ComputerIcon color="primary" />
          <Typography variant="h6" color="primary">
            {pc.name}
          </Typography>
        </Box>
        <Typography variant="h6" color="primary.main" fontWeight="bold">
          ₹{pc.totalPrice.toLocaleString()}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
        <Chip 
          size="small" 
          label={`${Object.keys(pc.components).length} components`}
          color="primary"
          variant="outlined"
        />
        <Typography variant="caption" color="text.secondary">
          Added {formatDistanceToNow(new Date(pc.createdAt), { addSuffix: true })}
        </Typography>
      </Box>

      <Divider sx={{ my: 1 }} />

      <List 
        dense 
        sx={{ 
          maxHeight: 200, 
          overflowY: 'auto',
          bgcolor: 'background.default',
          borderRadius: 1,
          mb: 2
        }}
      >
        {Object.entries(pc.components).map(([type, component]) => (
          <ListItem
            key={type}
            secondaryAction={
              <Typography variant="body2" color="text.secondary">
                ₹{component.price.toLocaleString()}
              </Typography>
            }
          >
            <ListItemText
              primary={
                <Typography variant="body2">
                  {type}: <span style={{ color: 'text.secondary' }}>{component.component}</span>
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>

      <Button
        variant="outlined"
        color="error"
        startIcon={<DeleteOutlineIcon />}
        onClick={() => onRemove(pc.id)}
        fullWidth
        size="small"
      >
        Remove
      </Button>
    </Paper>
  );
};

export default CartItem;